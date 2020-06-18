const express = require('express');
const app = express();

const mongoose = require('mongoose');

const cors = require("cors")

const dotenv = require('dotenv');

const morgan = require('morgan');

const expressValidator = require('express-validator');

const BodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const PostRoutes = require('./routes/post');

const AuthRoutes = require('./routes/auth');

const UserRoutes = require('./routes/user');

const fs = require("fs")






dotenv.config();

mongoose.connect( process.env.DB_URI, {useNewUrlParser: true ,  useUnifiedTopology: true } 

).then(() => console.log("DB connected"));

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});


app.get("/",(req,res)=>{

	fs.readFile("docs/apiDocs.json",(err,data)=>{

		if(err){return res.status(400).json({error:err})}
			const docs = JSON.parse(data);

		res.json(docs)
	})
})


//Middlewares
app.use(morgan("dev"));

app.use(cors())

app.use(expressValidator());

app.use(BodyParser.json());

app.use(cookieParser());



app.use("/", UserRoutes);

app.use("/", PostRoutes);

app.use("/", AuthRoutes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({

    	error: "Unauthorized"
    });
  }
});

app.listen(8080, () => {

	 console.log("Node listening at 8080");
} );
