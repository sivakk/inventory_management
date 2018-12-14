var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var mongoUrl = require('../db_config.js').config.url
var db = mongojs(mongoUrl, ['kitchen'])
var getStock = require('./db_functions').getItems
var updateKitchen = require('./db_functions').updateItem
var updateKitchenIngredient = require('./db_functions').pushItemToDoc

// get all items
router.get('/', function (req, res, next) {
  db.kitchen.find(function (err, items) {
    if (err) {
      res.send(err)
    } else {
      res.json(items)
    }
  })
})

router.post('/addBox', function (req, res, next) {
  var item = req.body
  console.log('@@@@@@@@@', item)
  if (!item.category) {
    res.status(400)
    res.json({
      'error': 'Bad Data'
    })
  } else {
    db.kitchen.save(item, function (err, item) {
      if (err) {
        res.send(err)
      }
      res.json(item)
    })
  }
})

// update raw cost
router.put('/updateKitchenItem', (req, res) => {
  var item = req.body
  console.log('item receied,', item)

  getStock('stock', (err, storedStock) => {
    if (err) {
      res.json({
        status: 404,
        message: 'requested data not found; updateKitchenItem'
      })
    } else {
      if (storedStock.name === item.ingredient_name) {
        console.log('stock name, added name', storedStock.name, item.ingredient_name)
        if (storedStock.quantity < item.ingredient_quantity) {
          res.json({
            status: 401,
            message: 'not psbl to add' + ' ' + item.ingredient_quantity + ' from ' + storedStock.quantity
          })
        } else {
          const newIngredient = {
            name: item.ingredient_name,
            quantity: item.ingredient_quantity,
            details: storedStock
          }
          const presentRawCost = item.raw_cost + item.ingredient_quantity * storedStock.cost
          const rawCostObj = {
            'raw_cost': presentRawCost
          }
          updateKitchen('kitchen', rawCostObj, item.tea_type_id, (error, response) => {
            if (error) {
              res.json({
                status: 402,
                message: 'not able to update item,  update kitchen item'
              })
            } else {
              updateKitchenIngredient('kitchen', newIngredient, item.tea_type_id, (error, response) => {
                if (error) {
                  res.json({
                    status: 402,
                    message: 'not able to update item,  update kitchen item'
                  })
                } else {
                  res.json(response)
                }
              })
            }
          })
        }
      }
    }
  })

  // db.kitchen.update(
  //   { _id: mongojs.ObjectId(item.tea_type_id) },
  //   {$set: {
  //     'raw_cost': item.raw_cost
  //   }},
  //   {upsert: true}, (err, item) => {
  //     if (err) {
  //       console.log(err)
  //       res.send(err)
  //     } else {
  //       console.log(item)
  //       res.json(item)
  //     }
  //   }
  // )
})

// update raw cost
router.put('/updateTotalCost', (req, res) => {
  var item = req.body
  console.log('item receied,', item)
  db.kitchen.update(
    { _id: mongojs.ObjectId(item._id) },
    {$set: {
      'total_cost': item.total_cost
    }},
    {upsert: true}, (err, item) => {
      if (err) {
        console.log(err)
        res.send(err)
      } else {
        console.log(item)
        res.json(item)
      }
    }
  )
})

router.put('/updateKitchenIngredients/:id', function (req, res, next) {
  var item = req.body
  var id = req.params.id
  console.log('updating kitchen ingredients', item, id)
  db.kitchen.update(
    {_id: mongojs.ObjectId(id)},
    {$push: {
      'ingredients': item
    }
    },
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
router.delete('/delStock/:id', function (req, res, next) {
  db.stock.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, item) {
    if (err) {
      res.send(err)
    }
    res.json(item)
  })
})

// Delete item
router.delete('/delKitchenItem/:id', function (req, res, next) {
  db.kitchen.remove({_id: mongojs.ObjectId(req.params.id)}, function (err, item) {
    if (err) {
      res.send(err)
    } else {
      console.log('removied item, ', item)
      res.json(item)
    }
  })
})

module.exports = router
