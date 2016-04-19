var mongoose = require('mongoose');
var Doctor = require('./doctors.js');
var Schema = mongoose.Schema;

var eventSchema = new mongoose.Schema({
  drIdentifier: String,
  name: String,
  eventStartsAt:Date,
  eventEndsAt:Date,
  aggree:Boolean,
  agreeSign:String,
  email:String,
  gender:String,
  phone:String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Event', eventSchema);
module.exports = 'Event';
