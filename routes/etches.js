const
    express = require('express'),
    etchRoutes = new express.Router()
    etchCntrl = require ('../controllers/etches.js')

    etchRoutes.get('/', etchCntrl.index)
    etchRoutes.post('/', etchCntrl.create)

    etchRoutes.get('/new', etchCntrl.new)
    etchRoutes.get('/:etchId/edit', etchCntrl.edit)

    etchRoutes.get('/:etchId', etchCntrl.show)
    etchRoutes.patch('/:etchId', etchCntrl.create)
    etchRoutes.delete('/:etchId', etchCntrl.destroy)

module.exports = etchRoutes