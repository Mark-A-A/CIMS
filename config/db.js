var mongoose = require('mongoose');
var mongoDBdeploy = require('./server.js')
//Database configuration
//mongoose.connect('mongodb://localhost:27017/cims-db');
mongoose.connect(mongoDBdeploy.url);
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

module.exports = db;
