exports.createPostValidator = (req, res, next) => {

	req.check("title", "Title should not be empty").notEmpty();

	req.check("title", "The title length should be between 4 to 20 characters ").isLength({

		min:4,
		max:20
	});

	req.check("body", "Body should not be empty").notEmpty();

	req.check("body", "The Body length should be between 4 to 1000 characters ").isLength({

		min:4,
		max:1000
	});

	const errors = req.validationErrors();
//If there are many error show the first one by sequence.
	if(errors)
	{
		const FirstError = errors.map(error => error.msg)[0];
		return res.status(400).json({

			error: FirstError 
		});
	}

};


exports.signupValidator = (req, res, next) => {

	req.check("name" , "Name is required ").notEmpty().isLength({

		min:4,
		max:10
	}).withMessage("Name length should be between 4 to 10 characters");

	req.check("email", "The email length should be between 4 to 30 characters ").matches(/.+\@.+\..+/)
	.withMessage("Email must contain @")
	.isLength({

		min:4,
		max:30
	});

	req.check("password" ,"password is required" ).notEmpty()
	.isLength({min:6})
	.withMessage("password must contain atleast 6 characters")
	.matches(/\d/)
	.withMessage("Password must contain a number");

	//Errors display

	const errors = req.validationErrors();
//If there are many error show the first one by sequence.
	if(errors)
	{
		const FirstError = errors.map(error => error.msg)[0];
		return res.status(400).json({

			error: FirstError 
		});
	}


next()

};