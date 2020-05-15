const mongoose = require('mongoose');

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


	}


});

module.exports = mongoose.model("Post", PostSchema);