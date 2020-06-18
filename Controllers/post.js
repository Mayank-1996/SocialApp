const Post = require("../models/post");

const formidable = require("formidable");

const fs = require("fs");

const _ = require("lodash");

exports.postById = (req,res,next,id) =>{

	Post.findById(id).exec((err,post)=>{

		if(err || !post) {

			return res.status(400).json({

					error : "Post not found"
			});
		}

		req.post = post;
		next();
	})

};


exports.PostHome = (req, res) => {

	const posts = Post.find()
	.populate("createdBy", "_id name")
	.select("_id title body")
	.then(posts => {

		res.json({posts})
	})
	.catch(err => console.log(err))

};

exports.CreatePostJson = (req,res,next) => {

	let form = new formidable.IncomingForm()
	form.keepExtensions = true
	form.parse(req,(err,fields,files)=>{

		if(err) {

			return res.status(400).json({

				error:"Image could not be uploaded"
			})
		}
		let post = new Post(fields);
		post.createdBy = req.profile

		console.log(req.profile)

		if(files.photo) {

			post.photo.data = fs.readFileSync(files.photo.path)
			post.photo.contentType = files.photo.type
		}

		post.save((err,result)=>{

			if(err) {
				return res.status(400).json({error:err});
			}
			result.createdBy.hashed_password= undefined
			result.createdBy.salt = undefined

			res.json(result);
		})

		
	})

	

};

exports.postByUser = (req,res)=> {

	Post.find({createdBy:req.profile._id})
	.populate("createdBy","_id name")
	.sort("_created")
	.exec((err,posts) => {

		if(err) {

			return res.status(400).json({error:err})
		}
		res.json(posts);
	})

}

exports.isPoster = (req,res,next) => {

	const poster = req.post && req.auth && req.post.createdBy._id == req.auth._id;

	if(!poster)

	{

		return res.status(403).json({error:"User not authorized to delete this post"})
	}

	next();
}

exports.deletePost = (req,res)=> {

	let post = req.post

	post.remove((err,post) => {


		if(err) {

			return res.status(400).json({error:err})
		}
		res.json({message:"post deleted successfully!!"})
	})	
}

exports.updatePost = (req,res) => {

	let post = req.post
	post = _.extend(post, req.body)

	post.updated = Date.now();
	post.save(err=>{


		if(err){

			return res.status(400).json({error:err})
		}
		res.json(post)
	})

}