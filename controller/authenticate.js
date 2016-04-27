var express = require('express');
var logout = require('express-passport-logout');
var passport = require('passport');
var router = express.Router();


// var eventDb = mongojs("cims-db",["events"]);
// var Event = require('../model/events.js');
var db = require('../config/db.js');
var passport = require('../config/passport-login-authenticate.js');
var mongoose = require('mongoose');
var Event = mongoose.model('Event');

debugger
console.log('controller for documents hit');

debugger
var Keys = process.env;
console.log("Keys: "+ Keys);
console.log("Keys.ACCESS_KEY_ID: " + Keys.ACCESS_KEY_ID);

// var Keys = process.env.AWS;
// console.log("Keys: "+Keys);

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET      = process.env.S3_BUCKET;

console.log ("S3_BUCKET: "+S3_BUCKET);

// docsDb.on('error',function(err){
//   console.log('database error: '+err);
// });

  // router.get('/success',function(req,res){
  //   console.log(req.username);
  //   res.send({state:'success',username:req.username ? req.username : null});
  // });


  router.get('/test', function(req, res){
    debugger
    res.send("OMG a route got hit -authenticate ctrl!!!");
  });

  router.get('/sign_s3', function (req, res) {
    debugger
    console.log("/sign_s3 hit!!!")
    aws.config.update({accessKeyId: Keys.ACCESS_KEY_ID, secretAccessKey: Keys.SECRET_ACCESS_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: Keys.S3_BUCKETS3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
      if (err) {
        debugger
        console.log("error: "+ err);
      }
      else {
        debugger
        var return_data = {
          signed_request: data,
          url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
        };
        console.log("data url returned: "+ returned_data.url)
        res.write(JSON.stringify(return_data));
        //res.end();
        res.send("got the file");
      }
    });
  });


  router.post('/submit_form', function (req, res) {
    debugger
    username = req.body.username;
    full_name = req.body.full_name;
    avatar_url = req.body.avatar_url;
    update_account(username, full_name, avatar_url); // TODO: create this function
    // TODO: Return something useful or redirect
    console.log("doing something");
    console.log("need to make function to add documents to DB");

    res.send("req.bod.avatar_url: "+ avatar_url);

  });


router.get('/test', function (req, res){
    res.send("OMG a route got hit!!!");
  });

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

  } else {
    res.send({});
  }
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/#/login');
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
 

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

      // if user is authenticated in the session, carry on
      if (req.isAuthenticated())
          return next();

      // if they aren't redirect them to the home page
      res.redirect('/');
  }

  
module.exports = router;