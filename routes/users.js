const 
    express = require('express'),
    passport = require('passport'),
    userRoutes = new express.Router()

    userRoutes.route('/login')
        .get((req, res) => {
            res.render('users/login')//flash message 
        })
        .post(passport.authenticate('local-login', {
            successRedirect: '/profile', 
            failureRediredt: '/login'
        }))
 
    userRoutes.route('/signup')
        .get((req, res) => {
                res.render('users/signup') // flash messages 
        })
        .post(passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRediredt: '/signup'
        }))

    userRoutes.get('/profile', isLoggedIn, (req, res) => {
        res.render('users/profile', {user: req.user})
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