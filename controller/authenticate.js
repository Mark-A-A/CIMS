var express = require('express');
var logout = require('express-passport-logout');
var router = express.Router();
var mongojs = require('mongojs');
// var eventDb = mongojs("cims-db",["events"]);
// var Event = require('../model/events.js');
var db = require('../config/db.js');
var mongoose = require('mongoose');
var Event = mongoose.model('Event');

// eventDb.on('error',function(err){
//   console.log('database error'+err);
// });

module.exports = function (passport) {

  router.get('/success',function(req,res){
    console.log(req.username);
    res.send({state:'success',username:req.username ? req.username : null});
  });

  router.get('/failure', function(req,res){
    res.send({state:'failure', user:null, message:"Invalid username or password"});
  });

  router.post('/login', passport.authenticate('login'), function(req, res) {
    if(req.user) {
      res.json(req.user);
    } else {
      res.json({});
    }
  });

  router.post('/signup', passport.authenticate('signup'), function(req, res) {
    if(req.user) {
      res.json(req.user);
    } else {
      res.json({});
    }
  });

  router.get('/signout', function(req,res){
    console.log("Signout route hit");
    logout();
    // req.logout();
    // req.session.destroy();
    // res.redirect('/');
    // if(req.user) {
    //   res.json(req.user);
    // } else {
    //   res.json({});
    // }
  });

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
    })
  });

  router.post('/addEvent',function(req,res,next){
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

      console.log("event startsAt :"+newEvent.eventStartsAt);
      console.log("event endsAt :"+newEvent.eventEndsAt);

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
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

return router;
};

