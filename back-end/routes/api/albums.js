const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const upload = multer();
// const sequelize = require("sequelize");

const { handleValidationErrors } = require("../../utils/validation"); 
const { requireAuth } = require("../../utils/auth");
const { Album, Track, User, sequelize } = require("../../db/models");

const router = express.Router();
router.use(requireAuth);


const validateAlbumDetails = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a TITLE for your album ( max 50 characters ).'),
    handleValidationErrors,
  ];


  // order: [
  //   [sequelize.fn('RANDOM')]
  // ]

// ========================================================================================
// GET ALL PUBLISHED ALBUMS WITH TRACKS AND USER DATA
// ========================================================================================
router.get('/', asyncHandler(async (req, res) => {

  const allAlbums = await Album.findAll({
    include: [
        {model: User, as: 'artist', attributes: {exclude: ['email','hashedPassword']}},
        {model: Track, as: 'tracks'}
    ]
    // QUERY FOR PUBLISHED ALBUMS ONLY!!!!
  })

  if(allAlbums) {
    res.json({allAlbums});
  } else {
    console.log("Albums not found")
  }

}))


// ========================================================================================
// GET ONE ALBUM FOR AN ARTIST WITH TRACKS AND USER DATA
// ========================================================================================
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {

    const album = await Album.findOne({
        where: {
            id: req.params.id,
        },
        include: [
            {model: User, as: 'artist', attributes: ['id', 'artistName', 'genre']},
            {model: Track, as: 'tracks'}
        ]
    })
    
    if(album) {
      res.json({album});
    } else {
      console.log("Album not found")
      //albumNotFoundError
    }
  
  }))

// ========================================================================================
// GET NEW ALBUMS - Limit 10 published
// ========================================================================================
router.get('/new', asyncHandler(async (req, res) => {

  const newAlbums = await Album.findAll({
    where: {
      isPublished: true,
    },
    attributes: ['id', 'title', 'description', 'imgUrl'],
    order: [['createdAt', 'DESC']],
    limit: 10,
    include: [
        {model: User, as: 'artist', attributes: ['id', 'artistName', 'genre'],},
    ],
    // QUERY FOR PUBLISHED ALBUMS ONLY!!!!
  })

  if(newAlbums) {
    res.json({newAlbums});
  } else {
    console.log("Albums not found")
  }

}))

// ========================================================================================
// GET RANDOM ALBUMS - Random 8 published records
// ========================================================================================
router.get('/random', asyncHandler(async (req, res) => {

  const featuredAlbums = await Album.findAll({
    where: {
      isPublished: true,
    },
    attributes: ['id', 'title', 'description', 'imgUrl'],
    order: sequelize.random(),
    limit: 8,
    include: [
        {model: User, as: 'artist', attributes: ['id', 'artistName', 'genre']},
    ],
  })

  if(featuredAlbums) {
    res.json({featuredAlbums});
  } else {
    console.log("Albums not found")
  }

}))

// ========================================================================================
// GET ALL ALBUMS FOR ARTIST (LOGGED IN USER) WITH TRACKS DATA (id = userId)
// ========================================================================================
router.get('/artist/:id(\\d+)/all', asyncHandler(async (req, res) => {

  const albums = await Album.findAll({
      where: {
          artistId: req.params.id
      },
      include: [
        {model: User, as: 'artist', attributes: {exclude: ['email','hashedPassword']}},
        {model: Track, as: 'tracks'}
      ]
  })
  
  if(albums) {
    res.json({albums});
  } else {
    console.log("Album not found")
    //albumNotFoundError
  }

}))


// ========================================================================================
// UPLOAD ALBUM ARTWORK AND TRACKS TO AWS BUCKET
// ========================================================================================
//AWS
const AWS = require("aws-sdk");
const { awsKeys } = require("../../config");

AWS.config.update({
  secretAccessKey: awsKeys.secretAccessKey,
  accessKeyId: awsKeys.accessKeyId,
  region: awsKeys.region,
}); // UPDATING CONFIG FOR S3

const s3 = new AWS.S3(); // CONSTRUCTS A SERVICE OBJECT

const fileFilter = (req, res, next) => {
  // CUSTOM CHECK FOR THE MIME TYPES

  const file = req.files[0];
    if(file) {
        if (file.mimetype === "image/jpeg"  || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
            next();
        } else {
            next({ status: 422, errors: ["Invalid Mime Type, only JPEG, JPEG, and PNG"] });
        }
    } else {
        next();
    }
};


// ========================================================================================
// CREATE AN ALBUM
// ========================================================================================
router.post(
  "/",
  upload.any(), // PARSES FORM DATA IN REQ.BODY AND REQ.FILES
  fileFilter,
  validateAlbumDetails,
  asyncHandler(async function (req, res, next) {

    const file = req.files[0];
    if(file) {
        const params = {
          Bucket: "songcamp-images",
          Key: Date.now().toString() + file.originalname, 
          Body: file.buffer,
          ACL: "public-read",
          ContentType: file.mimetype,
        };
    
        const promise = s3.upload(params).promise(); 
    
        const uploadedImage = await promise;
        req.body.imgUrl = uploadedImage.Location; 
    }

    let newAlbum = await Album.create(req.body);
    res.json({ newAlbum });
  })

    //   const albums = await Album.findAll({
    //     where: {
    //         artistId: req.params.id
    //     },
    //     include: [
    //         {model: User, attributes: {exclude: ['email','hashedPassword']}},
    //         {model: Track }
    //     ]
    // })
);


// ========================================================================================
// EDIT ALBUM
// ========================================================================================
router.put(
  "/:id(\\d+)",
  upload.any(), // PARSES FORM DATA IN REQ.BODY AND REQ.FILES
  fileFilter,
  validateAlbumDetails,
  asyncHandler(async function (req, res, next) {

    const file = req.files[0];
    if(file) {
        const params = {
        Bucket: "songcamp-images",
        Key: Date.now().toString() + file.originalname, 
        Body: file.buffer,
        ACL: "public-read",
        ContentType: file.mimetype,
        };
      
        const promise = s3.upload(params).promise(); 
    
        const uploadedImage = await promise;
        req.body.imgUrl = uploadedImage.Location; 
    }

    console.log("REQ BODY!!!", req.body);
    const album = await Album.findOne({
      where: {
        id: req.params.id
      },
    });
    
    if(album) {
      await album.update(req.body);
      res.json({ album })
    } else {
      console.log(`Album with id ${req.params.id} not found`)
      //albumNotFoundError
    }
  })
);


// ========================================================================================
// DELETE ALBUM ART
// ========================================================================================
router.patch(
    "/:id(\\d+)/delete-album-art",
    upload.any(), // PARSES FORM DATA IN REQ.BODY AND REQ.FILES
    asyncHandler(async function (req, res, next) {

      const album = await Album.findOne({
        where: {
          id: req.params.id
        },
      });
      
      if(album) {
        await album.update(req.body);
        res.json({ album })
      } else {
        console.log(`Album with id ${req.params.id} not found`)
        //albumNotFoundError
      }
    })
  );


  // ========================================================================================
// PUBLISH ALBUM
// ========================================================================================
router.patch(
    "/:id(\\d+)/publish",
    upload.any(), // PARSES FORM DATA IN REQ.BODY AND REQ.FILES
    asyncHandler(async function (req, res, next) {

      const album = await Album.findOne({
        where: {
          id: req.params.id
        },
      });
      
      if(album) {
        await album.update(req.body);
        res.json({ album })
      } else {
        console.log(`Album with id ${req.params.id} not found`)
        //albumNotFoundError
      }
    })
  );

module.exports = router;



// Encounter.findAll({ order: Sequelize.literal('rand()'), limit: 5 }).then((encounters) => {
//     // single random encounter
// }); 