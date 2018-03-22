const 
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js'),
    userCntrl = require ('../controllers/users.js')    


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, thatUser) => {
            done(err, thatUser)
        })
    })

//Local Signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            console.log(req.body)
            if(err) return done(err)
            if(user) return done(null, false, req.flash('signupMessage', "That email is taken."))
            if(!req.body.name || !req.body.email || !req.body.password) return done(null, false, req.flash('signupMessage', "All fields are required..."))
            if(req.body.password !== req.body.confirmPassword) return done(null, false, req.flash('signupMessage', "Passwords do not match."))
            var newUser = new User(req.body)
            newUser.save((err, savedUser) => {
                if(err) throw err
                return done(null, savedUser)
            })  
        })
    }))


//Local Signin 
passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, (req, email, password, done) => {
	User.findOne({email: email}, (err, user) => {
        console.log(user.validPassword(req.body.password))
		if(err) return done(err)
		if(!user) return done(null, false, req.flash('loginMessage', "No user found..."))
        if(!user.validPassword(req.body.password)) return done(null, false, req.flash('loginMessage', "Invalid Credentials. Try Again."))
		return done(null, user)
	})
}))

module.exports = passport 
