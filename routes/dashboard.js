var express = require('express')
var router = express.Router()
var jsonfile = require('jsonfile')

var file = 'data.json'

router.get('/', function (req, res, next) {
  res.json({
    status: 200,
    message: 'success'
  })
})

router.get('/data', function (req, res, next) {
  jsonfile.readFile(file, function (err, obj) {
    if (err) {
      res.json(
        {
          status: 404,
          message: 'file not found'
        }
      )
    } else {
      res.json(obj)
    }
  })
})

module.exports = router
