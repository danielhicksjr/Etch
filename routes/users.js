const 
    express = require('express'),
    passport = require('passport'),
    userRouter = new express.Router()

    userRouter.route('/login')
        .get((req, res) => {
            res.render('users/login')//flash message 
        })
        .post(passport.authenticate('local-login', {
            successRedirect: '/profile', 
            failureRediredt: '/login'
        }))
 
    userRouter.route('/signup')
        .get((req, res) => {
                res.render('users/signup') // flash messages 
        })
        .post(passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRediredt: '/signup'
        }))

    userRouter.get('/profile', isLoggedIn, (req, res) => {
        res.render('users/profile', {user: req.user})
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