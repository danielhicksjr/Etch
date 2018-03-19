const
    express = require('express'),
    etchRoutes = new express.Router()
    etchCntrl = require ('../controllers/etches.js')

etchRoutes.get('/', etchCntrl.index)
etchRoutes.post('/profile/etches', etchCntrl.create)

etchRoutes.get('/profile/etches/new', etchCntrl.new)
etchRoutes.get('/:etchId/edit', etchCntrl.edit)

etchRoutes.get('/:etchId', etchCntrl.show)
etchRoutes.patch('/:etchId', etchCntrl.create)
etchRoutes.delete('/:etchId', etchCntrl.destroy)

module.exports = etchRoutes