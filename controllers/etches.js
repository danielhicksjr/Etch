const
    Etch = require('../models/Etch.js'),
    NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

const apiUsername = process.env.API_USERNAME
const apiPassword = process.env.API_PASSWORD
  
const natural_language_understanding = new NaturalLanguageUnderstandingV1({
    "url": "https://gateway.watsonplatform.net/natural-language-understanding/api/",
    "username": `${apiUsername}`,
    "password": `${apiPassword}`,
    "version_date": "2017-02-27"
});


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
        res.render('etches/new', {user: req.user, message: req.flash('invalid-text')})
    },

    create: (req, res) => {
        console.log(req.body.title)
        if (!req.body.title){ 
            req.flash('invalid-text', "A title is required...")
            return res.redirect('/etches/new')
        }
        const parameters = {
            'text': req.body.body,
            'features': {
                'emotion': {
                    'document': true
                },
                'sentiment': {
                    'document': true
                },
            },
            'return_analyzed_text': true
          }
          natural_language_understanding.analyze(parameters, function(err, response) {
            if (err) {
                console.log('error:', err)
                req.flash('invalid-text', "Text is invalid, cannot analyze. Please try again")
                return res.redirect('/etches/new')
            
            } else if(response !== null){
                console.log(response)
                const newEtch = new Etch(req.body)
                newEtch.user = req.user._id
                newEtch.result = response
                newEtch.save((err, brandNewEtch) => {
        
                  res.redirect(`/etches/${newEtch._id}`)
              })}
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