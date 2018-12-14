var express = require('express')
var router = express.Router()

// get all items
router.get('/', function (req, res, next) {
  res.send('node working')
})

module.exports = router
