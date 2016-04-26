var mongoose = require('mongoose');

//Database configuration
if( process.env.PORT) {
  mongoose.connect("mongodb://heroku_bw23419l:qh5rebm2e4btsd5huq4sng6mqj@ds041144.mlab.com:41144/heroku_bw23419l");
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
