var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  title: String,
  link: String,

});

mongoose.model('Article', articleSchema);
module.exports = Article;
