const
    express = require('express'),
    etchRoutes = new express.Router(),
    etchCntrl = require ('../controllers/etches.js')

etchRoutes.get('/', etchCntrl.index)

etchRoutes.post('/', isLoggedIn, etchCntrl.create)

etchRoutes.get('/new', isLoggedIn, etchCntrl.new)
etchRoutes.get('/:etchId/edit', isLoggedIn, etchCntrl.edit)

etchRoutes.get('/:etchId', isLoggedIn, etchCntrl.show)
etchRoutes.patch('/:etchId', isLoggedIn, etchCntrl.create)
etchRoutes.delete('/:etchId', isLoggedIn, etchCntrl.destroy)


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) return next()
    res.redirect('/')
}

module.exports = etchRoutes