var mongojs = require('mongojs')
var mongoUrl = require('../db_config.js').config.url
var db = mongojs(mongoUrl)

module.exports = {
  'getItems': (coll, retu3n) => {
    db.collection(coll).find((err, data) => {
      if (err) {
        retu3n(err, null)
      } else {
        retu3n(null, data)
      }
    })
  },
  'updateItem': (coll, updateObj, id, retu3n) => {
    db.collection(coll).update(
      { _id: mongojs.ObjectId(id) },
      {
        $set: updateObj
      },
      { upsert: true }, (err, item) => {
        if (err) {
          console.log(err)
          retu3n(err, null)
        } else {
          console.log(item)
          retu3n(null, item)
        }
      }
    )
  },
  'pushItemToDoc': (coll, pushItem, id, retu3n) => {
    db.collection(coll).update(
      { _id: mongojs.ObjectId(id) },
      {
        $push: pushItem
      },
      { upsert: true }, function (err, item) {
        if (err) {
          console.log(err)
          retu3n(err, null)
        } else {
          console.log(item)
          retu3n(null, item)
        }
      })
  }
}
