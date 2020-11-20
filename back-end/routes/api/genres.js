const express = require("express");
const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const { Genre } = require("../../db/models");

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const genres = await Genre.findAll({
        attributes: ['id', 'type']
    });
    
    res.json({genres});    
}));

module.exports = router;