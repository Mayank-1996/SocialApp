
const express = require('express');

const {createPostValidator} = require('../Validator');

const {PostHome, CreatePostJson,postByUser,postById,isPoster,deletePost,updatePost} = require("../Controllers/post");

const {signInCheck} = require("../Controllers/auth");

const {userById} = require("../Controllers/user");


const router = express.Router();

router.get("/posts", PostHome);

router.post("/createPost/new/:userid" ,signInCheck,CreatePostJson,createPostValidator);

router.get("/posts/by/:userid", signInCheck, postByUser)

router.delete("/post/:postid",signInCheck,isPoster,deletePost)

router.put("/post/:postid",signInCheck,isPoster,updatePost)

router.param("userid",userById)

router.param("postid",postById)

module.exports = router;