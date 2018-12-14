const mongoose = require("mongoose");

const issueSchema = mongoose.Schema({
  issueName: {
    type: String

  },
  issueComment: {
    type: String

  },
  date: {
    type: String,

  },

});

module.exports = mongoose.model("Issue", issueSchema);
