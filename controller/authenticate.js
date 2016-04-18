var express = require('express');
var logout = require('express-passport-logout');
var router = express.Router();
var mongojs = require('mongojs');
var eventDb = mongojs("cims-db",["Events"]);

eventDb.on('error',function(err){
  console.log('database error'+err);
});

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

   eventDb.Events.find({doctorId: doctorId}, function(err, documents){
        if(err){
            console.log(err);
        } else {
          console.log("Pulled Calendar for the doctor"+doctorId);
            res.json(documents);
        }
    })
  });

  return router;

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}