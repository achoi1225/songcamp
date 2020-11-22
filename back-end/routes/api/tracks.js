const express = require("express");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const upload = multer();
// const { check } = require("express-validator");

const { requireAuth } = require("../../utils/auth");
const { Album, Track } = require("../../db/models");

const router = express.Router();
router.use(requireAuth);


//=================================================================
//AWS
//=================================================================
const AWS = require("aws-sdk");
const { awsKeys } = require("../../config");

AWS.config.update({
  secretAccessKey: awsKeys.secretAccessKey,
  accessKeyId: awsKeys.accessKeyId,
  region: awsKeys.region,
}); // UPDATING CONFIG FOR S3

const s3 = new AWS.S3(); // CONSTRUCTS A SERVICE OBJECT

const trackFileFilter = (req, res, next) => {
  // CUSTOM CHECK FOR THE MIME TYPES

  const file = req.files[0];
  if(file) {
    if (file.mimetype === "audio/mpeg"  || file.mimetype === "audio/vnd.wav" || file.mimetype === "audio/mp4") {
      next();
    } else {
      next({ status: 422, errors: ["Invalid Mime Type, only MP3, MP4, and WAV"] });
    }
  } else next();
};


// ========================================================================================
// CREATE TRACK
// ========================================================================================
router.post(
  "/",
    upload.any(), // PARSES FORM DATA IN REQ.BODY AND REQ.FILES
    trackFileFilter,
    asyncHandler(async function (req, res, next) {

    console.log("INSIDE CREATE TRACK!!");
    const file = req.files[0];

    if(file) {
      const params = {
        Bucket: "songcamp-audio",
        Key: Date.now().toString() + file.originalname, 
        Body: file.buffer,
        ACL: "public-read",
        ContentType: file.mimetype,
      };
  
      const promise = s3.upload(params).promise(); 
  
      const uploadedTrack = await promise;
      req.body.trackUrl = uploadedTrack.Location; 
    }

    console.log("REQ BODY!!!", req.body);
    const newTrack= await Track.create(req.body);
    res.json({ newTrack });
  })
);

module.exports = router;