const 
    express = require('express'),
    userRoutes = new express.Router(),
    passport = require('passport'),
    Etch = require('../models/Etch.js'),
    User = require('../models/User.js')
    
 

userRoutes.get('/login', (req, res) => {
    res.render('users/login', { message: req.flash('loginMessage')})
})
        
userRoutes.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', 
    failureRedirect: '/login'
}))
 
userRoutes.get('/signup', (req, res) => {
    res.render('users/signup',  { message: req.flash('signupMessage')}) 
})
        
userRoutes.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
}))

userRoutes.get('/profile', isLoggedIn, (req, res) => {
    Etch.find({user: req.user}, (err, allEtches) => {
        res.render('users/profile', {user: req.user, message: req.flash('welcomeMessage'), etches: allEtches})
    })    
})

userRoutes.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

userRoutes.get('/:userId/edit', (req, res) => {
    User.findById(req.params.userId, (err, thatUser) => {
        if(err) return console.log(err)
        res.render('users/edit', {user: thatUser})
    })
})

userRoutes.patch('/:userId', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, req.body, {new: true}, (err, updatedUser) => {
        if(err) return console.log(err)
        res.redirect('/profile')
    })
})

userRoutes.delete('/:userId', (req, res) => {
    User.findByIdAndRemove(req.params.userId, (err, deletedUser) => {
        Etch.remove({user: req.params.userId}, (err) => {
            res.redirect('/')
        })
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next()
    res.redirect('/')
}

module.exports = userRoutes