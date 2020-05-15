const express = require('express');

const {signupValidator} = require('../Validator');

const {createSignup, UserSignin, Signout} = require("../Controllers/auth");


const router = express.Router();


router.post("/signup" ,signupValidator, createSignup);

router.post("/signin", UserSignin);

router.get("/signout", Signout);


module.exports = router;