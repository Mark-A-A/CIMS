var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  location: {
    city: String,
    state: String
  }
});

mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
