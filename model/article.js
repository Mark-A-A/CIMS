var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  img: String,
  title: String,
  body: String,
  link: String
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
