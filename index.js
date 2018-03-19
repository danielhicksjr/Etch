const 
    dotenv = require('dotenv').config(),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    passport = require('passport'),
    passportConfig = require('./config/passport.js')
   


const 
    PORT = process.env.PORT || 3000, 
    mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/etch'



app.listen(PORT, (err) => {
    console.log(err || `Running server on ${PORT}`)
})