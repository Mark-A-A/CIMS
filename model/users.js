var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String, //has created from password
  created_at: {
    type: Date,
    default: Date.now
  }
});

var User = mongoose.model('User', userSchema);
module.exports = User;
