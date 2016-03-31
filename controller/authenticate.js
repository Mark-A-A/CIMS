var express = require('express');
var router = express.Router();

module.exports = function (passport) {

  router.get('/success',function(req,res){
    // res.send({state:'success',username:req.username ? req.username : null});
    console.log("Above success");
    // res.sendFile('index.html');
    // res.send({state:'success',username:req.username});
        console.log("Below success");
        res.send({state:'success',username:'Chinmay'});
  });

  router.get('/failure', function(req,res){
    res.send({state:'failure', user:null, message:"Invalid username or password"});
  });

  router.post('/login', passport.authenticate('login',{
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  }));

  // router.post('/signup', passport.authenticate('signup',{
  //   successRedirect: '/auth/success',
  //   failureRedirect: '/auth/failure'
  // }));

  // traditional route handler, passed req/res
  router.post('/signup', function(req, res, next) {
    // generate the authenticate method and pass the req/res
    passport.authenticate('signup', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/'); }

      // req / res held in closure
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(user);
      });

    })(req, res, next);

  });

// router.post('/signup', passport.authenticate('signup',{}));

  router.get('/signout', function(req,res){
    req.logout();
    res.redirect('/');
  });
  return router;
};
