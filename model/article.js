var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  img: String,
  title: String,
  body: String,
  link: String
});

mongoose.model('Article', articleSchema);
