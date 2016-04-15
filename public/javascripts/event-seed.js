var _ = require('lodash');
var db = require('../../config/db.js');
var Event = require('../../model/events.js');
var Doctor = require('../../model/doctors.js');

//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "mongodb://localhost:27017/cims-db";
var collections = ["Events"];
var db = mongojs(databaseUrl, collections);

db.on('error', function(err) {
  console.log('Database Error:', err);
});

var doctorEvents = [
  {
    "doctorId": "1",
    "eventTitle": "Appointment with Mr.X",
    "startDateTime": "04/10/2016 10AM",
    "endDateTime": "04/10/2016 11AM"
  },
  {
    "doctorId": "1",
    "eventTitle": "Appointment with Mr.Y",
    "startDateTime": "04/10/2016 11:00 AM",
    "endDateTime": "04/10/2016 12:00 PM"
  },
  {
    "doctorId": "1",
    "eventTitle": "Appointment with Mr.Z",
    "startDateTime": "04/10/2016 1:00 PM",
    "endDateTime": "04/10/2016 2:00 PM"
  },
  {
    "doctorId": "2",
    "eventTitle": "Appointment with Mr.X",
    "startDateTime": "04/10/2016 10AM",
    "endDateTime": "04/10/2016 11AM"
  },
  {
    "doctorId": "2",
    "eventTitle": "Appointment with Mr.Y",
    "startDateTime": "04/10/2016 11:00 AM",
    "endDateTime": "04/10/2016 12:00 PM"
  },
  {
    "doctorId": "2",
    "eventTitle": "Appointment with Mr.Z",
    "startDateTime": "04/10/2016 1:00 PM",
    "endDateTime": "04/10/2016 2:00 PM"
  },
]

 // _.map(doctorEvents, function(doctorEvent){
 //    var event = new Event({
 //      doctorId: doctorEvent.doctorId,
 //      eventTitle: doctorEvent.eventTitle,
 //      startDateTime: doctorEvent.startDateTime,
 //      endDateTime : doctorEvent.endDateTime
 //  });
  // var event = new Event({
  //     doctorId: "2",
  //     eventTitle: "Appointment with Mr.Z",
  //     startDateTime:  "04/10/2016 1:00 PM",
  //     endDateTime : "04/10/2016 2:00 PM",
  //     created_at :Date
  // });
    db.Events.save(function (err) {
      if (err) return handleError(err);
    });
// });

