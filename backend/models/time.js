const mongoose = require("mongoose");

const timerSchema1 = mongoose.Schema({

  jobstarttime: {
    type: String
  },



  day: {
    type: String

  },

  date: {
    type: String,

  },

  stop: {
    type: Number,

  },

  jobstarted: {
    type: Boolean,
    default: false
  },
  jobended: {
    type: Boolean,
    default: false
  },
  timet: {
    type: String
  },

  jobendtime: {
    type: String
  },
  jobdone: {
    type: String
  }





});

module.exports = mongoose.model("Time", timerSchema1);