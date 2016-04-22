var mongoose = require('mongoose');

//Database configuration
if( process.env.PORT) {
  mongoose.connect("mongodb://chinmay:chinmay@ds013981.mlab.com:13981/heroku_gg87f7mk");
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
