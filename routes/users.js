const 
    express = require('express'),
    userRouter = new express.Router(),
    passport = require('passport')
 

    userRouter.route('/login')
        .get((req, res) => {
            res.render('users/login', { message: req.flash('loginMessage')})
        })
        .post(passport.authenticate('local-login', {
            successRedirect: '/profile', 
            failureRedirect: '/login'
        }))
 
    userRouter.route('/signup')
        .get((req, res) => {
                res.render('users/signup',  { message: req.flash('signupMessage')}) 
        })
        .post(passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/signup'
        }))

    userRouter.get('/profile', isLoggedIn, (req, res) => {
        res.render('users/profile', {user: req.user, message: req.flash('welcomeMessage')})
        })


    userRouter.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()) return next()
        res.redirect('/')
    }

    module.exports = userRouter 