
const express = require('express');

const {createPostValidator} = require('../Validator');

const {PostHome, CreatePostJson} = require("../Controllers/post");


const router = express.Router();

router.get("/", PostHome);

router.post("/createPost" ,createPostValidator, CreatePostJson);


module.exports = router;

