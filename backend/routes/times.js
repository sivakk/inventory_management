var express = require("express");
var router = express.Router();
const Time = require("../models/time");
var dateFormat = require('dateformat');
var moment = require("moment");
var now = moment();
var now1 = Date.now();
let day1 = now.format("MMMM Do YYYY");




router.get('/time', (req, res, next) => {
  Time.find(function (err, time) { ///get time
    if (err)
      res.json(err);
    else {
      res.json(time);
    }

  })
});
savetime = function (newTime, callback) {
  newTime.save((err, time1) => {

    if (err) {

      callback(err)
    } else {
      callback(time1);
    }

  });
}


router.post('/post_route', (req, res, next) => { ///post time 


  Time.findOne({
      date: now.format("MMMM Do YYYY")
    },
    function (err, result) {
      if (err) {
        res.json(err);
      }
      if (result == "undefined" || result == null) {

        let date1 = now.format("MMMM Do YYYY");
        let jobstarttime = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss A");
        let day2 = dateFormat(new Date(), "yyyy-mm-dd");
        let timet = now.format("h:MM:ss A");
        day1 = new Date().getMilliseconds();
        jobstarted = req.body.jobstarted;
        jobstarttime = req.body.jobstarttime;
        timet = req.body.timet;
        jobupdatetime = req.body.jobupdatetime;
        jonended = req.body.jonended;
        jobdone = req.body.jobdone;


        let time1 = {
          jobstarttime: jobstarttime,
          date: date1,
          jobstarted: jobstarted,
          jobendtime: 0,
          jonended: jonended,
          jobdone: jobdone || 0
        };
        console.log(time1);

        let newTime = new Time(time1);
        savetime(newTime, function (error, resp) {
          if (error) {
            res.send(error)
          } else {
            res.send(resp);
          }

        });

      } else {

        console.log("date is  in the table");




      }

    });













});


router.put('/putroute/', (req, res, next) => {

  Time.findOneAndUpdate({
      date: req.body.date
    }, {
      $set: {
        jobstarted: req.body.jobstarted,
        jobstarttime: req.body.jobstarttime


      }
    },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result)
      }

    });
});


router.put('/putroutestoptime/', (req, res, next) => {

  // console.log(req.body.jobendtime);
  // console.log(req.body.date)

  Time.findOneAndUpdate({
      date: req.body.date
    }, {
      $set: {
        jobended: req.body.jobended,
        jobendtime: req.body.jobendtime
      }
    },
    function (err, result1) {
      if (err) {
        res.json(err);
      } else {
        res.json(result1)
      }

    });
});

router.put('/putroutetotaltime/', (req, res, next) => {

  // console.log(req.body.jobendtime);
  // console.log(req.body.date)

  Time.findOneAndUpdate({
      date: req.body.date
    }, {
      $set: {
        jobdone: req.body.jobdone
      }
    },
    function (err, result1) {
      if (err) {
        res.json(err);
      } else {
        res.json(result1)
      }

    });
});





module.exports = router;