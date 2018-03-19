const 
    dotenv = require('dotenv').config(),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    passport = require('passport'),
    passportConfig = require('./config/passport.js')
   


const 
    PORT = process.env.PORT || 3000, 
    mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/user-authentication'

mongoose.connect(mongoConnectionString, (err) => {
   console.log(err || "Connected to MongoDB (user-authentication)")
})

const store = new MongoDBStore({
    uri: mongoConnectionString, 
    collection: 'sessions'
});


app.listen(PORT, (err) => {
    console.log(err || `Running server on ${PORT}`)
})