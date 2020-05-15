const Post = require("../models/post");

exports.PostHome = (req, res) => {

	const posts = Post.find()
	.select("_id title body")
	.then(posts => {

		res.json({posts})
	})
	.catch(err => console.log(err))

};

exports.CreatePostJson = (req,res) => {

	const post = new Post(req.body);

	//console.log("Creating Post:",req.body);

	post.save().then(result =>{

		
		res.status(200).json({

			message : result
		}
		)

	})

};