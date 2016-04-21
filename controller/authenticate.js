var express = require('express');
var logout = require('express-passport-logout');
var router = express.Router();
//var mongojs = require('mongojs');
// var eventDb = mongojs("cims-db",["events"]);
// var Event = require('../model/events.js');
var db = require('../config/db.js');
var passport = require('../config/passport-login-authenticate.js');
var mongoose = require('mongoose');
var Event = mongoose.model('Event');


router.post('/login', passport.authenticate('login'), function(req, res) {
  if (req.user) {
    res.send(req.user);
  } else {
    res.send({});
  }
});

router.post('/signup', passport.authenticate('signup'), function(req, res) {
  if (req.user) {
    res.send(req.user);
    res.redirect('/');

  } else {
    res.send({});
  }
});

router.get('/logout', function(req, res) {
  console.log('hey');
  req.logOut();  // <-- not req.logout();
  res.redirect('/');
});

router.get('/populateCalendar/:id', function(req, res, next) {
  var doctorId = req.params.id;
  // console.log("doctor id is :"+doctorId);
  // var newEvent = new Event();
  Event.find({
    drIdentifier: doctorId
  }, function(err, documents) {
    if (err) {
      console.log(err);
    } else {
      // console.log("Pulled Calendar for the doctor"+doctorId);
      res.json(documents);
    }
  });
});

/*router.post('/addEvent', function(req, res, next) {
  // console.log("In addEvent function");
  // console.log(req.body.appointment);
  var newEvent = new Event();

  newEvent.drIdentifier = req.body.appointment.drIdentifier,
    newEvent.name = req.body.appointment.name,
    newEvent.eventStartsAt = req.body.appointment.eventStartsAt,
    newEvent.eventEndsAt = req.body.appointment.eventEndsAt,
    newEvent.aggree = req.body.appointment.aggree,
    newEvent.agreeSign = req.body.appointment.agreeSign,
    newEvent.email = req.body.appointment.email,
    newEvent.gender = req.body.appointment.gender,
    newEvent.phone = req.body.appointment.phone,

    // save the Event
    newEvent.save(function(err) {
      if (err) {
        console.log('Error in Saving the Event: ' + err);
        throw err;
      }
      // console.log("Event Successfully saved");
    });

  res.json({});
});*/

  router.get('/populateCalendar/:id',function(req,res,next){
    var doctorId = req.params.id;
    // console.log("doctor id is :"+doctorId);
    // var newEvent = new Event();
    Event.find({drIdentifier: doctorId}, function(err, documents){
        if(err){
            console.log(err);
        } else {
          // console.log("Pulled Calendar for the doctor"+doctorId);
            res.json(documents);
        }
    });
  });

  router.post('/addEvent',function (req,res,next) {
    // console.log("In addEvent function");
    // console.log(req.body.appointment);
      var newEvent = new Event();

      newEvent.drIdentifier =  req.body.appointment.drIdentifier,
      newEvent.name = req.body.appointment.name,
      newEvent.eventStartsAt = req.body.appointment.eventStartsAt,
      newEvent.eventEndsAt = req.body.appointment.eventEndsAt,
      newEvent.aggree = req.body.appointment.aggree,
      newEvent.agreeSign = req.body.appointment.agreeSign,
      newEvent.email = req.body.appointment.email,
      newEvent.gender = req.body.appointment.gender,
      newEvent.phone = req.body.appointment.phone,

      // save the Event
      newEvent.save(function(err) {
        if (err){
          console.log('Error in Saving the Event: '+err);
          throw err;
        }
        // console.log("Event Successfully saved");
      });

     res.json({});
  });
module.exports = router;
