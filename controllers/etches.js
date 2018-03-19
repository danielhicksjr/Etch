const Etch = require('../models/Etch.js')

module.exports = {
    index: (req, res) => {
        res.render('etches/index')
    },

    show: (req, res) => {
        Etch.findById(req.params.id, (err, thatEtch) => {
            if (err) return console.log(err)
            res.render('etches/show', {etch: thatEtch})
        })
    },

    new: (req, res) => {
        res.render('etches/new')
    },

    create: (req, res) => {
        Etch.create(req.body, (err, brandNewEtch) => {
            if (err) return console.log(err)
            res.redirect('etches/show')
        })
    },

    edit: (req, res) => {
        Etch.findById(req.params.id, (err, thatEtch) => {
            if (err) return console.log(err)
            res.render('etches/edit', {etch: thatEtch}) 
        })
    },

    destroy: (req, res) => {
        Etch.findByIdAndRemove(req.params.id, (err, deletedEtch) => {
            if (err) return console.log(err)
            res.redirect('users/profile')
        })
    }

}