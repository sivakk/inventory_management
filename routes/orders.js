var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var mongoUrl = require('../db_config.js').config.url
var db = mongojs(mongoUrl, ['orders'])

// get all items
router.get('/', function (req, res, next) {
  db.orders.find(function (err, items) {
    if (err) {
      res.send(err)
    } else {
      res.json(items)
    }
  })
})

router.post('/addOrder', function (req, res, next) {
  var item = req.body
  console.log('@@@@@@@@@', item)
  if (!item.assigned_to) {
    res.status(400)
    res.json({
      'error': 'Bad Data'
    })
  } else {
    db.orders.save(item, function (err, res_item) {
      if (err) {
        res.send(err)
      } else {
        let adminDB = 'admin_' + item.assigned_to
        db.collection(adminDB).save(item, (err, res_obj)=>{
          if (err) {
            res.json({
              status: 400,
              message: 'could not save to admin db'
            })
          } else {
            res.send(res_obj)
          }
        })
      }
    })
  }
})

router.put('/updateOrder/:id', function (req, res, next) {
  var item = req.body
  console.log('!!@@@@@@@@@', item)
  db.orders.update(
    {_id: mongojs.ObjectId(item._id)},
    { $set: {ingredient: item.ingredient, ingredient_quantity: item.ingredient_quantity} },
    {upsert: true}, function (err, item) {
      if (err) {
        console.log(err)
        res.send(err)
      } else {
        console.log(item)
        res.json(item)
      }
    })
})

// Delete item
router.delete('/delOrder/:id', function (req, res, next) {
  db.orders.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, item) {
    if (err) {
      res.send(err)
    }
    res.json(item)
  })
})

module.exports = router
