const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const upload = multer();

const { requireAuth } = require("../../utils/auth");
const { Album, Track, User } = require("../../db/models");

const router = express.Router();
router.use(requireAuth);


// ========================================================================================
// GET ALL PUBLISHED ALBUMS WITH TRACKS AND USER DATA
// ========================================================================================
router.get('/', asyncHandler(async (req, res) => {

  const allAlbums = await Album.findAll({
    include: [
        {model: User, attributes: {exclude: ['email','hashedPassword']}},
        {model: Track }
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
            {model: User, attributes: {exclude: ['email','hashedPassword']}},
            {model: Track }
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
// GET ALL ALBUMS FOR ARTIST (LOGGED IN USER) WITH TRACKS DATA (id = userId)
// ========================================================================================
router.get('/artist/:id(\\d+)/all', asyncHandler(async (req, res) => {

  const albums = await Album.findAll({
      where: {
          artistId: req.params.id
      },
      include: [
          {model: User, attributes: {exclude: ['email','hashedPassword']}},
          {model: Track }
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

  console.log("INSIDE FILE FILTER!!");
  const file = req.files[0];
  if(file) {
    if (file.mimetype === "image/jpeg"  || file.mimetype === "image/jpp" || file.mimetype === "image/png") {
      next();
    } else {
      next({ status: 422, errors: ["Invalid Mime Type, only JPEG, JPEG, and PNG"] });
    }
  } else next();
};


// ========================================================================================
// CREATE AN ALBUM
// ========================================================================================
router.post(
  "/",
  upload.any(), // PARSES FORM DATA IN REQ.BODY AND REQ.FILES
  fileFilter,
  asyncHandler(async function (req, res, next) {

    console.log("INSIDE ALBUM CREATE!!!");
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
      console.log("INSIDE CONDITIONAL!!!")
    }

    console.log("REQ BODY!!!", req.body);
    const newAlbum = await Album.create(req.body);
    console.log("NEW ALBUM CREATED!!", newAlbum);
    res.json({ newAlbum });
  })
);


// ========================================================================================
// EDIT ALBUM
// ========================================================================================
router.put(
  "/:id(\\d+)",
  upload.any(), // PARSES FORM DATA IN REQ.BODY AND REQ.FILES
  fileFilter,
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
      const updatedAlbum = update.album(req.body);
      return res.json({ updatedAlbum })
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