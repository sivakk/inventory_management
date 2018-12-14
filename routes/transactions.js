var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var mongoUrl = require('../db_config.js').config.url
var db = mongojs(mongoUrl, ['users'])

// get all investments
router.get('/investments', function (req, res, next) {
  db.transactions.find(function (err, investments) {
    if (err) {
      res.send(err)
    } else {
      res.send(investments)
    }
  })
})

// save an item
router.post('/addInvestment', function (req, res, next) {
    var investment = req.body

    db.transactions.save(investment, (err, item) => {
      if (err) {
        res.send(err)
      } else {
        item.status = 'success'
        res.send(item)
      }
    })

})

router.delete('/delInvestment/:id', function (req, res, next) {
  db.transactions.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, item) {
    if (err) {
      res.send(err)
    }
    res.json(item)
  })
})

module.exports = router
