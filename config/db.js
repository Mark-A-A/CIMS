var mongoose = require('mongoose');
//var mongoDBheroku = require('./mongoDB.js');

//Database configuration

if( process.env.PORT) {
  mongoose.connect("mongodb://cims-admin:RBCcims1.@ds027295.mlab.com:27295/heroku_6ltfx28p");  
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
