const express = require('express');


const {showAllUsers,showUser,userById,updateUser,deleteUser} = require("../Controllers/user");

const {signInCheck} = require("../Controllers/auth");


const router = express.Router();


router.get("/users", showAllUsers);

router.get("/user/:userid",signInCheck,showUser);

router.put("/user/:userid",signInCheck,updateUser)

router.delete("/user/:userid",signInCheck,deleteUser)

router.param("userid",userById)


module.exports = router;