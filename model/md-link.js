var mongoose = require('mongoose');

var webmdSchema = new mongoose.Schema({
  title: String,
  link: String
});

mongoose.model('Web-Md', webmdSchema);
