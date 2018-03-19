const 
    dotenv = require('dotenv').config(),
    express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    ejsLayouts = require('express-ejs-layouts'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    passport = require('passport'),
    passportConfig = require('./config/passport.js'),
    userRoutes = require('./routes/users.js'),
    etchRoutes = require('./routes/etches.js')
   


const 
    PORT = process.env.PORT || 3000, 
    mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/user-authentication'

mongoose.connect(mongoConnectionString, (err) => {
    console.log(err || 'Connected to MongoDB')
})

const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
});

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(ejsLayouts)
app.use(cookieParser())
app.use('/', userRoutes)
app.use(':userId/etches', etchRoutes)

app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')

app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
   res.render('etches/index')
})

app.listen(PORT, (err) => {
    console.log(err || `Running server on ${PORT}`)
})