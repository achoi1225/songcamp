const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");

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

// Artist Sign up
// router.post(
//   '',
//   validateSignup,
//   asyncHandler(async (req, res) => {
    // const { 
    //   email, 
    //   password, 
    //   userName, 
    //   artistName,
    //   isArtist,
    //   genre, 
    //   bio, 
    //   imgUrl } = req.body;

//     const user = await User.signup({ email, userName, password, artistName, isArtist, genre, bio, imgUrl });

//     await setTokenCookie(res, user);

//     return res.json({
//       user,
//     });
//   }),
// );

module.exports = router;