var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  title: String,
  link: String,
});

var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
