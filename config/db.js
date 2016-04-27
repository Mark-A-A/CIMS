var mongoose = require('mongoose');

//Database configuration
if( process.env.PORT) {

  mongoose.connect("mongodb://heroku_6ltfx28p:7trf9f2g8vnr3l4kltv9ch216m@ds027295.mlab.com:27295/heroku_6ltfx28p");

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
