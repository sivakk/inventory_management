var express = require("express");
var router = express.Router();
const Issue = require("../models/issue");
var moment = require("moment");
var now = moment();



router.get('/test', (req, res, next) => {
  Issue.find(function (err, issues) {
    if (err)
      res.json(err);
    else {
      res.json(issues);
    }

  })
});



saveitem = function (newIssue, callback) {
  newIssue.save((err, issue) => {

    if (err) {

      callback(err)
    } else {
      callback(issue);
    }

  });
}
router.post('/post_route', (req, res, next) => {

  let date = moment().format('MMMM Do YYYY,h:mm A');
  let item = req.body;
  item.date = date;


  let newIssue = new Issue(item);
  saveitem(newIssue, function (err, resp, sucess) {
    if (err) {
      res.send(err)
    } else {
      res.send(resp);
    }

  });
});




module.exports = router;