var express = require('express')
var router = express.Router()
var mongojs = require('mongojs')
var mongoUrl = require('../db_config.js').config.url
var db = mongojs(mongoUrl, ['login'])
const jwt = require('jsonwebtoken')
const verifyToken = require('../Auth/auth')
const verify = require('../Auth/auth')
const duration = require('../Auth/config').duration

// get all items
router.get('/', verifyToken, function (req, res, next) {
  db.credentials.find(function (err, creds) {
    if (err) {
      res.json(err)
    } else {
      res.json({ creds })
    }
  })
})

router.post('/newLogin', function (req, res, next) {
  var newLoginObj = req.body
  const username = newLoginObj.username
  const password = newLoginObj.password

  db.users.findOne(
    {
      username: username,
      password: password
    }, (err, data) => {
      if (err) {
        console.log('got error', err)
        res.json(err)
      } else {
        if (!data) {
          res.json({
            'status': 404
          })
        } else {
          jwt.sign({ data }, 'spaatSecret', { expiresIn: duration }, (err, token) => {
            if (err) {
              res.json({ err })
            } else {
              res.json({
                token, user_data: data
              })
            }
          })
        }
      }
    })
})

router.get('/isLogged', verify, function (req, res, next) {
  jwt.verify(req.token, 'spaatSecret', (err, authData) => {
    if (err) {
      console.log('------------------------------------')
      console.log('got a false for jwt', err)
      console.log('------------------------------------')
      res.send(false)
    } else {
      res.send(true)
    }
  })
})

module.exports = router
