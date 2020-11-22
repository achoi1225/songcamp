const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth");
const { Follower, User } = require("../../db/models");

//Following Not Found Error
const followingNotFoundError = (id) => {
    const err = Error("Following not found");
    err.errors = [`Following with the id of ${id} could not be found`];
    err.title = 'Following not found';
    err.status = 404;
    return err;
}

router.use(requireAuth);


// =============================================================================================
// GET LIST OF ALL ARTISTS FAN IS FOLLOWING
// =============================================================================================
router.get('/following', asyncHandler(async(req, res) => {
    const userId = parseInt(req.user.id, 10);
    const following = await Follower.findAll({
        where: {
            userId: userId
        },
        attributes: ['id', 'userId', 'followingId'],
        include: [
            {
                model: User,
                attributes: ['id','userName','imgUrl']
            },
        ]

        // include: [
        //     {model: User, attributes: {exclude: ['email','hashedPassword']}},
        // ]
    })
    
    // console.log("FOLLOWING!!!", following[0].followingId)
    res.json({following});    
}));


// =============================================================================================
// GET LIST OF ALL FANS FOLLOWING ARTIST
// =============================================================================================
router.get('/followers', asyncHandler(async(req, res) => {
    const userId = parseInt(req.user.id, 10);
    const followers = await Follower.findAll({
        where: {
            followingId: userId,
        },
        attributes: ['id', 'userId', 'followingId'],
        include: [
            {
                model: User, 
                as: "user",
                attributes: ['id', 'userName','imgUrl']
            },
        ]
    })
    
    // console.log("FOLLOWING!!!", following[0].followingId)
    res.json({followers});    
}));


// =============================================================================================
// CREATE A NEW FOLLOWING
// =============================================================================================
router.post(`/:id(\\d+)`, asyncHandler( async(req, res) => {
    const userId = parseInt(req.params.id);
    const { followingId } = req.body;

    console.log("FOLLOWING ID!!!!", req.body);

    const newFollow = await Follower.create({
        userId,
        followingId
    })

    res.json({newFollow});
}))


// =============================================================================================
// DELETE A FOLLOWING
// =============================================================================================
router.delete("/:id(\\d+)", asyncHandler( async(req, res, next) => {
    const id = parseInt(req.params.id);

    console.log("INSIDE DELETE!!")
    const following = await Follower.findByPk(id);

    if(following) {
        console.log("following!!", following);
        await following.destroy();
        res.status(204).end();
    } else {
        console.log("Cannot find following to delete");
        next(followingNotFoundError(id));
    }
}))

module.exports = router;