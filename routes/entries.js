var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var mongoUrl = require('../db_config.js').config.url
var db = mongojs(mongoUrl, ['entries'])

var date = new Date()

const addNewEntry = (newEntry, confirm) => {
  db.entries.save(newEntry, function (err, item) {
    if (err) {
      confirm(err)
    }
    confirm(null, item)
  })
}

// get all items
router.get('/', function (req, res, next) {
  db.entries.find(function (err, entries) {
    if (err) {
      res.send(err)
    } else {
      res.json(entries)
    }
  })
})

router.post('/addEntry', function (req, res, next) {
  var item = req.body
  var newEntry = {
    'date': date,
    'name': item.name,
    'quantity': item.quantity,
    'measuring_unit': item.measuring_unit,
    'cost': item.cost,
    'operation': item.operation
  }
  console.log('@@@@@@@@@', newEntry)
  if (!newEntry.name) {
    res.status(400)
    res.json({
      'error': 'Bad Data'
    })
  } else {
    db.entries.save(newEntry, function (err, item) {
      if (err) {
        res.send(err)
      }
      res.json(item)
    })
  }
})

module.exports = {
  router: router,
  addNewEntry: addNewEntry
}
