const User = require('../models/user');

const jwt = require("jsonwebtoken");

const expressJwt = require("express-jwt");

require('dotenv').config();

exports.createSignup = async (req , res) => {

	//If user exists

	const userExists = await User.findOne({email: req.body.email});

	if(userExists) {
	 return res.status(403).json({error : "User with email" +req.body.email+" alredy exists"});
}
	

	//else create a new user

	const user = await new User(req.body);

	await user.save();

	res.status(200).json({message : "Signup susccessful ! please Login"});

};

exports.UserSignin = (req , res ) => {

	//If user exists

	const {email , password} = req.body;

	User.findOne({email} , (err , user) => {

		if(!user || err) {

			return res.status(401).json({

				error: "User with Email does not exist!"
			});
		}

		//If user found Authenticate

		if(!user.Authenticate(req.body.password)) {

			return res.status(401).json({

				error: "User and password does not match"
			});
		}

			const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET);

			res.cookie("t", token , {expire: new Date() + 9999});

			const { _id , name , email} = user;

			return res.json({token, user : {_id, email, name}});

	});



};

exports.Signout = (req,res) => {

		res.clearCookie("t");

		return res.json({message: "Signout successful!"});


	}

exports.signInCheck = expressJwt({

	secret : process.env.JWT_SECRET,
	userProperty: "auth"

	//If token is verified Expressjwt appends auth key to request body.
});