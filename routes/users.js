const 
    express = require('express'),
    userRoutes = new express.Router(),
    passport = require('passport'),
    Etch = require('../models/Etch.js')
 

    userRoutes.route('/login')
        .get((req, res) => {
            res.render('users/login', { message: req.flash('loginMessage')})
        })
        .post(passport.authenticate('local-login', {
            successRedirect: '/profile', 
            failureRedirect: '/login'
        }))
 
    userRoutes.route('/signup')
        .get((req, res) => {
                res.render('users/signup',  { message: req.flash('signupMessage')}) 
        })
        .post(passport.authenticate('local-signup', {
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

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()) return next()
        res.redirect('/')
    }

    module.exports = userRoutes