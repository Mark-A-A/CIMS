var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var webmdSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  link: {
    type: String,
    unique: true
  }
});

webmdSchema.plugin(uniqueValidator);
var WebMD = mongoose.model('WebMD', webmdSchema);
module.exports = WebMD;
