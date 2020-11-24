const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const upload = multer();

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();


// Valdiate sign up for FANS
const validateFanSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('userName')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('userName')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];


// Validate signup for ARTISTS
const validateArtistSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('userName')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('userName')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('artistName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an artist/band name name.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// FAN SIGN UP
router.post(
  '/fans',
  validateFanSignup,
  asyncHandler(async (req, res) => {
    const { 
      email, 
      password, 
      userName, 
      artistName,
      isArtist,
      genre, 
      bio, 
      imgUrl } = req.body;

    const user = await User.signup({ email, userName, password, artistName, isArtist, genre, bio, imgUrl });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);


// ARTIST SIGN UP
router.post(
  '/artists',
  validateArtistSignup,
  asyncHandler(async (req, res) => {
    const { 
      email, 
      password, 
      userName, 
      artistName,
      isArtist,
      genre, 
      bio, 
      imgUrl } = req.body;

    const user = await User.signup({ email, userName, password, artistName, isArtist, genre, bio, imgUrl });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);


// Edit user (Bio, Photo)
// AWS
const AWS = require("aws-sdk");
const { awsKeys } = require("../../config");

AWS.config.update({
  secretAccessKey: awsKeys.secretAccessKey,
  accessKeyId: awsKeys.accessKeyId,
  region: awsKeys.region,
}); // UPDATING CONFIG FOR S3

const s3 = new AWS.S3(); // CONSTRUCTS A SERVICE OBJECT

const imgFileFilter = (req, res, next) => {
  
  console.log("INSIDE IMG FILE FILTER!!!")
  console.log("REQ!!! ", req);
  if(req.files) {
    const file = req.files[0];
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
      next();
    } else {
      next({ status: 422, errors: ["invalid Mime Type - only JPEG, JPEG, and PNG"]});
    }
  } else next();
};


// ========================================================================================
// EDIT USER BIO / PHOTO
// ========================================================================================
router.patch("/:id(\\d+)", 
  upload.any(),
  imgFileFilter,
  asyncHandler( async(req, res, next) => {

    console.log("INSIDE PHOTOS ROUTER!!!!")
    // GET FILE REFERENCE
    
    //CREATE PARAMS OBJECT FOR S3
    if(req.files) {
      const file =req.files[0];
      const params = {
        Bucket: "songcamp-images",
        Key: Date.now().toString() + file.originalname,
        Body: file.buffer,
        ACL: "public-read",
        ContentType: file.mimetype,
      };
  
    //   // CREATE A PROMISE FROM THE UPLOAD
      const promise = s3.upload(params).promise(); 
  
      const uploadedImage = await promise;
  
    //   // GET URL OF THE FILE AND PUT IT IN THE REQUEST OBJECT FOR LATER USE
      req.body.imgUrl = uploadedImage.Location;
    }
    
    // console.log("CHECK IF REQ BODY HAS IMG URL!!!", req.body.imgUrl);

    const user = await User.findOne({
          where: {
            id: req.params.id
          },
        });

    
    if(!user) {
      console.log('Error from api/user/PUT - user not found!')
    // next(listNotFoundError(req.params.id));
    } else {
      const updatedUser = await user.update(req.body);
      console.log("UPDATED USER!!!! ", updatedUser);
      res.json({updatedUser});
    }
  })
)

module.exports = router;