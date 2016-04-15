var passport = require('passport');
var passportLocal = require('passport-local');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Keys = require("../.env");
//console.log(Keys);



// load up the user model
var User       = require('../model/users');


module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
    
    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))
    // code for twitter (use('twitter', new TwitterStrategy))

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    

    // Use the GoogleStrategy within Passport.
    //   Strategies in Passport require a `verify` function, which accept
    //   credentials (in this case, an accessToken, refreshToken, and Google
    //   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: "----",//CLIENT_ID,
  clientSecret: "----", //CLIENT_SECRET,
  //callbackURL: 'https://localhost:3000/auth/google/callback'
  callbackURL: 'https://cimsmed.dev/auth/google/callback'
  passReqToCallback   : true
},
      

  function(token, refreshToken, profile, done) {

    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Google
    process.nextTick(function() {

      // try to find the user based on their google id
      User.findOne({ 'google.id' : profile.id }, function(err, user) {
        if (err)
          return done(err);

        if (user) {

              // if a user is found, log them in
          return done(null, user);
        } else {
          // if the user isnt in our database, create a new user
          var newUser          = new User();

          // set all of the relevant information
          newUser.google.id    = profile.id;
          newUser.google.token = token;
          newUser.google.name  = profile.displayName;
          newUser.google.email = profile.emails[0].value; // pull the first email

          // save the user
          newUser.save(function(err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        };
      });
    });

  }));

};



