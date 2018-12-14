var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var mongoUrl = require('../db_config.js').config.url
var db = mongojs(mongoUrl, ['users'])

// get all items
router.get('/', function (req, res, next) {
  db.users.find(function (err, items) {
    if (err) {
      res.send(err)
    } else {
      res.json(items)
    }
  })
})

// save an item
router.post('/addUser', function (req, res, next) {
  var item = req.body
  if (!item.name) {
    res.status(400)
    res.json({
      'error': 'Bad Data'
    })
  } else {
    item.database_name = 'admin_' + item.name
    db.users.save(item, function (err, item) {
      if (err) {
        res.json(err)
      } else {
        const collectionName = 'admin_' + item.name
        db.createCollection(collectionName, (err, collection) => {
          if (err) {
            console.log('-----------------error-------------------')
            console.log(err)
            console.log('-----------------error-------------------')
          } else {
            res.json(item)
          }
        })
      }
    })
  }
})

router.delete('/delUser/:id', function (req, res, next) {
  db.users.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, item) {
    if (err) {
      res.send(err)
    }
    res.json(item)
  })
})

module.exports = router
