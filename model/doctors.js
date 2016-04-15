var mongoose = require('mongoose');
var Event = require('./events.js');
var Schema = mongoose.Schema;

var doctorSchema = new mongoose.Schema({
  _id : Number,
  name: String,
  specialty: String,
  events:[{ type: Schema.Types.ObjectId, ref: 'Event' }],
  location: {
    city: String,
    state: String
  }
});

mongoose.model('Doctor', doctorSchema);
module.exports = 'Doctor';
