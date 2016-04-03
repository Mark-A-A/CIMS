var express = require('express');
var logout = require('express-passport-logout');
var router = express.Router();

module.exports = function (passport) {

  router.get('/success',function(req,res){
    console.log(req.username);
    res.send({state:'success',username:req.username ? req.username : null});
  });

  router.get('/failure', function(req,res){
    res.send({state:'failure', user:null, message:"Invalid username or password"});
  });

  // router.post('/login', passport.authenticate('login',{
  //   successRedirect: '/auth/success',
  //   failureRedirect: '/auth/failure'
  // }));

  // router.post('/signup', passport.authenticate('signup',{
  //   successRedirect: '/auth/success',
  //   failureRedirect: '/auth/failure'
  // }));

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
  return router;
};
