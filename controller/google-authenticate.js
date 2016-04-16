var express = require('express');
var logout = require('express-passport-logout');
var router = express.Router();
var googleOauth2 = require("../config/passport-google-oauth.js");

debugger

var googleAuthenticate = function () {

var passport = require("passport");
debugger
console.log(passport.authenticate());

  console.log("google-authenticate being exported");
//send user to Google to Authenticate
// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
  router.get('/auth/google', function(req, res){
    debugger
    //res.send('/auth/google hitting')
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login']}) 
  //}));
  });

  //Google sends user back with token and profile
  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  // router.get('/auth/google/callback', 
  //   passport.authenticate('google', { failureRedirect: '/login' }),
  //   function(req, res) {
  //     debugger
  //     res.redirect('/');
  //   });
  router.get( '/auth/google/callback', 
      passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/login'
      })
  );


  return router;


  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) 
      return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
  }
}

module.exports = googleAuthenticate;





/////////////////////// Scrap

  // router.get('/auth/example', 
  //   passport.authenticate('oauth2'), function (req, res){
  //     console.log("did something: ");
  //     if(err){ 
  //       console.log("err: "+err);
  //     } else {
  //       res.render("oauth2 with passport did something")  
  //     };
      
  //   });

  // router.get('/auth/example/callback', 
  //   passport.authenticate('oauth2', { failureRedirect: '/login' }), 
  //     function(req, res) {
  //   // Successful authentication, redirect home.
  //       res.redirect('/');
  // });



//
  // Redirect the user to the OAuth provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
  // router.get('/auth/google', passport.authenticate('provider', function (req, res){
  //     console.log("did something: ");
  //     if(err){ 
  //       console.log("err: "+err);
  //     } else {
  //       res.render("oauth2 with passport did something")  
  //     };
      
  //   }));

// The OAuth provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
  // router.get('/auth/google/callback',
  //   passport.authenticate('provider', { successRedirect: '/',
  //                                     failureRedirect: '/login' }));
