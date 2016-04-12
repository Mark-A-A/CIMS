var mongoose = require('mongoose');
var Events = require('./events.js');
// var Schema = mongoose.Schema;

var doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  events:[Events],
  location: {
    city: String,
    state: String
  }
});

mongoose.model('Doctor', doctorSchema);
module.exports = 'Doctor';
