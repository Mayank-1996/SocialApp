const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema

const PostSchema = new mongoose.Schema({

	title : {
		type : String,
		required : "Title is required",
		minlength : 4,
		maxlength : 100

	},

	body : {

		type : String,
		required : "Body is required",
		minlength : 4,
		maxlength : 1000


	},

	createdBy : {

		type : ObjectId,
		ref: "User"
	},

	photo:{

		data:Buffer,
		contentType: String
	},
	created:{

		type:Date,
		default:Date.now()
	},
	updated:{
		type :Date
	}


});

module.exports = mongoose.model("Post", PostSchema);