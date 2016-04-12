var mongoose = require('mongoose');
var Doctor = require('./doctors.js');
var Schema = mongoose.Schema;

var eventSchema = new mongoose.Schema({
  doctorId: [{ type: Schema.ObjectId, ref: 'Doctor' }],
  eventTitle: String, //has created from password
  startDateTime:Date,
  endDateTime:Date,
  created_at: {
    type: Date,
    default: Date.now
  }
});

mongoose.model("Events", eventSchema);
module.exports = 'Events';
