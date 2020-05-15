const express = require('express');
const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');

const morgan = require('morgan');

const expressValidator = require('express-validator');

const BodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const PostRoutes = require('./routes/post');

const AuthRoutes = require('./routes/auth');


dotenv.config();

mongoose.connect( process.env.DB_URI, {useNewUrlParser: true ,  useUnifiedTopology: true }

).then(() => console.log("DB connected"));

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

//Middlewares
app.use(morgan("dev"));

app.use(expressValidator());

app.use(BodyParser.json());

app.use(cookieParser());


app.use("/", PostRoutes);

app.use("/", AuthRoutes);

app.listen(8080, () => {

	 console.log("Node listening at 8080");
} );
