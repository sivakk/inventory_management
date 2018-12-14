var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var mongoUrl = require('../db_config.js').config.url
const entries = require('./entries').addNewEntry
var db = mongojs(mongoUrl, ['stock'])
var moment = require('moment')

// get all items
router.get('/getStock', function (req, res, next) {
  db.collection('stock').find(function (err, items) {
    if (err) {
      res.json(err)
    } else {
      res.json(items)
    }
  })
})

router.get('/getAdminStock', function (req, res, next) {
  const userDB = req.headers.user_data.data.database_name
  console.log('------------------------------------')
  console.log('admin database:', userDB)
  console.log('------------------------------------')
  db.collection(userDB).find(function (err, items) {
    if (err) {
      res.json(err)
    } else {
      res.json(items)
    }
  })
})

// save an item
router.post('/addStock', function (req, res, next) {
  var newItem = req.body
  newItem.stock_added_date = moment().format()
  if (!newItem.stock_name) {
    res.json({
      status: 401,
      message: 'Bad Data'
    })
  } else {
    db.stock.save(newItem, function (err, item) {
      if (err) {
        res.json(err)
      } else {
        item.operation = 'add'
        entries(item, (error, data) => {
          if (err) {
            res.json(error)
          } else {
            res.json(item)
          }
        })
      }
    })
  }
})

// Delete item
router.delete('/delStock/:id', function (req, res, next) {
  db.stock.findAndModify({
    query: { _id: mongojs.ObjectId(req.params.id) },
    remove: true,
    new: false
  }, function (err, item) {
    if (err) {
      res.json(err)
    } else {
      item.operation = 'delete'
      entries(item, (error, data) => {
        if (err) {
          res.json(error)
        } else {
          res.json(item)
        }
      })
    }
  })
})

router.put('/updateStock/:id', function (req, res, next) {
  var item = req.body

  if (item.remaining_quantity) {
    db.stock.update(
      { _id: mongojs.ObjectId(item._id) },
      { $set: { remaining_quantity: item.remaining_quantity } },
      { upsert: true, fullResult: true }, function (err, item) {
        if (err) {
          console.log(err)
          res.json(err)
        } else {
          item.operation = 'update_remaining_quantity'
          entries(item, (error, data) => {
            if (err) {
              res.json(error)
            } else {
              res.json(item)
            }
          })
        }
      })
  }
})

router.put('/editStockItem/:id', (req, res, next) => {
  var item = req.body
  db.stock.update(
    { _id: mongojs.ObjectId(item._id) },
    {
      $set:
      {
        cost: item.cost,
        quantity: item.quantity,
        total_cost: item.total_cost
      }
    },
    { upsert: true, fullResult: true }, function (err, item) {
      if (err) {
        console.log(err)
        res.json(err)
      } else {
        item.operation = 'edit_stock'
        entries(item, (error, data) => {
          if (err) {
            res.json(error)
          } else {
            res.json(item)
          }
        })
      }
    })
})

module.exports = router
