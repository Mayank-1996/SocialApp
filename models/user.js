const mongoose = require('mongoose');

var uuidv1 = require('uuidv1');

var crypto = require('crypto');


const UserSchema = new mongoose.Schema({

	name : {

		type: String,
		trim : true,
		required : true
	},

	email : {

		type: String,
		trim : true,
		required : true
	},

	hashed_password : {

		type : String,
		required : true
	},

	salt : String,

	created : {

		type : Date ,

		default : Date.now
	},

	updated : Date

}
);

UserSchema.virtual('password')
.set(function(password){

	this._password = password;

	this.salt = uuidv1()

	this.hashed_password = this.encryptpassword(password);
}).get(function() {

	return this._password;
})



//methods

UserSchema.methods = {

	encryptpassword : function(password) {

		if(!password) return "";
		try{

			return crypto.createHmac("sha256", this.salt)
  .update(password)
  .digest("hex");
		} catch (err) {
			return ""
		} 
	},

	Authenticate : function(password) {

		return this.hashed_password === this.encryptpassword(password)
	}




};

module.exports = mongoose.model("User", UserSchema);