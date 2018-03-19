const
    mongoose = require('mongoose'),
    etchSchema = new mongoose.Schema({
        title: String,
        body: String,
        result: Object
    })

const Etch = mongoose.model('Etch', etchSchema)

module.exports = Etch