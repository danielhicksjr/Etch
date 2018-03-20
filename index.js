const 
    dotenv = require('dotenv').config(),
    express = require('express'),
    app = express(),
    ejsLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    passport = require('passport'),
    passportConfig = require('./config/passport.js'),
    userRoutes = require('./routes/users.js'),
    etchRoutes = require('./routes/etches.js')
   


const 
    PORT = process.env.PORT || 3000, 
    mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/etch'

mongoose.connect(mongoConnectionString, (err) => {
    console.log(err || 'Connected to MongoDB')
})

const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
});

app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')
app.use(ejsLayouts)

app.use(session({
    secret: "happydays",
    cookie: {maxAge : 60000000},
    resave: true,
    saveUninitialized: false,
    store: store
}))

app.use(passport.initialize());
app.use(passport.session())

app.use((req, res, next) => {
    app.locals.currentUser = req.user 
    app.locals.loggedIn = !!req.user 

    next()
})


app.get('/', (req, res) => {
   res.render('etches/index')
})

app.use('/', userRoutes)
app.use('/', etchRoutes)


app.listen(PORT, (err) => {
    console.log(err || `Running server on ${PORT}`)
})