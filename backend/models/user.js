const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  imagedisplay: {
    type: String,
    required: true
  }



});

module.exports = mongoose.model("User", userSchema);
