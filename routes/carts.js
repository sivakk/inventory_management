var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var mongoUrl = require('../db_config.js').config.url
var db = mongojs(mongoUrl, ['carts'])

// get all items
router.get('/', function (req, res, next) {
  db.carts.find(function (err, items) {
    if (err) {
      res.send(err)
    } else {
      res.json(items)
    }
  })
})

// save an item
router.post('/addCart', function (req, res, next) {
  var item = req.body
  if (!item.cart_name) {
    res.status(400)
    res.json({
      'error': 'Bad Data'
    })
  } else {
    db.carts.save(item, function (err, item) {
      if (err) {
        res.send(err)
      }
      res.json(item)
    })
  }
})

router.delete('/delCart/:id', function (req, res, next) {
  db.carts.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, item) {
    if (err) {
      res.send(err)
    }
    res.json(item)
  })
})

module.exports = router
