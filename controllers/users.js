const 
    passport = require('passport'),
    Etch = require('../models/Etch.js'),
    User = require('../models/User.js')

module.exports = {
    loginNew: (req, res) => {
        res.render('users/login', { message: req.flash('loginMessage')})
    },
    loginCreate:
        passport.authenticate('local-login', {
            successRedirect: '/profile', 
            failureRedirect: '/login'
    }),
    signupNew: (req, res) => {
        res.render('users/signup',  { message: req.flash('signupMessage')}) 
    },
    signupCreate: 
        passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/signup'
    }),
    show: (req, res) => {
        Etch.find({user: req.user}, (err, allEtches) => {
            res.render('users/profile', {user: req.user, message: req.flash('welcomeMessage'), etches: allEtches})
        })    
    },
    logout: (req, res) => {
        req.logout()
        res.redirect('/')
    },
    edit: (req, res) => {
        User.findById(req.params.userId, (err, thatUser) => {
            if(err) return console.log(err)
            res.render('users/edit', {user: thatUser, message: req.flash('profileMessage')})
        })
    },
    update: (req, res) => {
        if(req.body.password !== req.body.confirmPassword){
            req.flash('profileMessage', "Passwords do not match.")
            res.redirect(`/${req.user._id}/edit`)
        } 
        else if(!req.body.password || !req.body.confirmPassword) {
            delete req.body.password
            Object.assign(req.user, req.body)
            req.user.save((err, updatedUser) => {
            if(err) return console.log(err)
            res.redirect('/profile')
          })
        }
        else {  
            Object.assign(req.user, req.body)
            req.user.save((err, updatedUser) => {
                if(err) return console.log(err)
                res.redirect('/profile')
            })
        }
    },
    destroy: (req, res) => {
        User.findByIdAndRemove(req.params.userId, (err, deletedUser) => {
            Etch.remove({user: req.params.userId}, (err) => {
                res.redirect('/')
            })
        })
    }


}