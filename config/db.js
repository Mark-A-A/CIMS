var mongoose = require('mongoose');
var mongoDBheroku = require('./mongoDB.js');
//Database configuration
//mongoose.connect('mongodb://localhost:27017/cims-db');
mongoose.connect(mongoDBheroku.url);
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

module.exports = db;
