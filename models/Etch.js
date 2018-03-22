const
    mongoose = require('mongoose'),
    etchSchema = new mongoose.Schema({
        title: {type: String, required: true},
        body: {type: String, required: true},
        result: Object,
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }, {timestamps: true})

const Etch = mongoose.model('Etch', etchSchema)

module.exports = Etch