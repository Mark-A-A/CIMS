var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var articleSchema = new mongoose.Schema({
  img: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    unique: true
  },
  body: {
    type: String,
    unique: true
  },
  link: {
    type: String,
    unique: true
  }
});

articleSchema.plugin(uniqueValidator, { message: 'Ignore!' });
var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
