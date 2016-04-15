var mongoose = require('mongoose');
var Doctor = require('./doctors.js');
var Schema = mongoose.Schema;

var eventSchema = new mongoose.Schema({
  // doctorId: [{ type: Schema.ObjectId, ref: 'Doctor' }],
  doctorId: Number,
  eventTitle: String,
  startDateTime:Date,
  endDateTime:Date,
  created_at: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Event', eventSchema);
module.exports = 'Event';
