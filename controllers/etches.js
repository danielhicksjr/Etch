const Etch = require('../models/Etch.js')

module.exports = {
    index: (req, res) => {
        res.render('etches/index')
    },

    show: (req, res) => {
        Etch.findById(req.params.etchId, (err, thatEtch) => {
            if (err) return console.log(err)
            res.render('etches/show', {etch: thatEtch})
        })
    },

    new: (req, res) => {
        res.render('etches/new', {user: req.user})
    },

    create: (req, res) => {
        const newEtch = new Etch(req.body)
        newEtch.user = req.user._id
        newEtch.save((err, brandNewEtch) => {
            res.redirect('/profile')
        })
    },

    edit: (req, res) => {
        Etch.findById(req.params.etchId, (err, thatEtch) => {
            if (err) return console.log(err)
            res.render('etches/edit', {etch: thatEtch}) 
        })
    },

    destroy: (req, res) => {
        Etch.findByIdAndRemove(req.params.etchId, (err, deletedEtch) => {
            if (err) return console.log(err)
            res.redirect('/profile')
        })
    }

}