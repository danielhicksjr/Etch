const 
    express = require('express'),
    passport = require('passport'),
    userRouter = new express.Router()

    userRouter.route('/login')
        .get((req, res) => {
            res.render('users/login')
        })
        .post(/* create session using Passport */)
 
    userRouter.route('/signup')
        .get((req, res ) => {
                res.render('users/signup')
        })
        .post(/*create acct using Passport */ )

    userRouter.get('/profile', isLoggedIn, (req, res) => {
        //render the user's profile (only if they are currently logged in )
    })

    userRouter.get('/logout', (req, res) => {
        //destroy the session, and redirect user back to homepage 
    })

    function isLoggedIn(req, res, next){
        if(req.isAuthenticated()) return next()
        res.redirect('/')
    }

    module.exports = userRouter 