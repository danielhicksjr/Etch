const 
    express = require('express'),
    userRoutes = new express.Router(),
    userCntrl = require ('../controllers/users.js')    
 

userRoutes.get('/login', userCntrl.loginNew)
        
userRoutes.post('/login', userCntrl.loginCreate)
 
userRoutes.get('/signup', userCntrl.signupNew)
        
userRoutes.post('/signup', userCntrl.signupCreate)

userRoutes.get('/profile', isLoggedIn, userCntrl.show)

userRoutes.get('/logout', userCntrl.logout)

userRoutes.get('/:userId/edit', isLoggedIn, userCntrl.edit)

userRoutes.patch('/:userId', isLoggedIn, userCntrl.update)

userRoutes.delete('/:userId', isLoggedIn, userCntrl.destroy)

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next()
    res.redirect('/')
}

module.exports = userRoutes