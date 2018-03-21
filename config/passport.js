const 
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User.js')

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
            if(err) return done(err)
            if(user) return done(null, false, req.flash('signupMessage', "That email is taken."))
            if(!req.body.name || !req.body.password) return done(null, false, req.flash('signupMessage', "All fields are required..."))
            var newUser = new User()
            newUser.name = req.body.name
            newUser.email = req.body.email
            newUser.password = newUser.generateHash(req.body.password)
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
		if(err) return done(err)
		if(!user) return done(null, false, req.flash('loginMessage', "No user found..."))
		if(!user.validPassword(req.body.password)) return done(null, false, req.flash('loginMessage', "Wrong Password."))
		return done(null, user, req.flash('welcomeMessage', `Welcome back, ${user.name}!`))
	})
}))

module.exports = passport 
