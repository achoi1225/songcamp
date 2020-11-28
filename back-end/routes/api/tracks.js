const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const multer = require("multer");
const upload = multer();

const { handleValidationErrors } = require("../../utils/validation"); 
const { requireAuth } = require("../../utils/auth");
const { Album, Track } = require("../../db/models");

const router = express.Router();
router.use(requireAuth);


const validateTrackDetails = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a TITLE for your track ( max 50 characters ).'),
    handleValidationErrors,
];


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
  '/',
    upload.any(), // PARSES FORM DATA IN REQ.BODY AND REQ.FILES
    trackFileFilter,
    validateTrackDetails,
    asyncHandler(async function (req, res, next) {
      
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

    const newTrack = await Track.create(req.body);
    res.json({ newTrack });
  })
);


// ========================================================================================
// EDIT TRACK TITLE ONLY!
// ========================================================================================
router.patch(
    '/:id(\\d+)',
    upload.any(),
    trackFileFilter,
    validateTrackDetails,
    asyncHandler(async function (req, res, next) {

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
  
        const updatedTrack = await Track.findOne({
            where: {
                id: req.params.id,
            }
        });

        if(updatedTrack) {
            await updatedTrack.update(req.body);
            res.json({ updatedTrack });
        } else {
            console.log("Track not found");
        }
    })
  );


// ========================================================================================
// DELETE TRACK
// ========================================================================================
router.delete('/:id(\\d+)', 
    asyncHandler(async(req,res,next) => {
    const track = await Track.findOne({
      where: {
        id: req.params.id
      }
    });
  
    if(track) {
      await track.destroy();
      res.json({message:`Deleted track with id of ${req.params.id}!`});
      res.status(204).end();
    } else {
    //   next(listNotFoundError(req.params.id));
        console.log("ERROR!")
        next();
    }
  }));
      

module.exports = router;