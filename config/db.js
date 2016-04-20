var mongoose = require('mongoose');
//var mongoDBheroku = require('./mongoDB.js');

//Database configuration

if( process.env.PORT) {
  mongoose.connect("mongodb://greenlantern:greenlantern@ds011231.mlab.com:11231/heroku_2dcmrzw5");  
} else {
  mongoose.connect('mongodb://localhost:27017/cims-db');
}

var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

module.exports = db;
