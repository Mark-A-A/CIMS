var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSchema = {
  name: String,
  specialty: String,
  location: {
    city: String,
    state: String
  },
};

var Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
