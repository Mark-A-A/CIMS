var express = require('express');
var path = require('path');
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('./config/passport-login-authenticate');
var session = require('express-session');
//var scraper = require('./config/scraper.js');

var PORT = process.env.PORT || 3000;

var db = require('./config/db.js');
var user = require('./model/users.js');
var doctor = require('./model/doctors.js');
var event = require('./model/events.js');


//var authenticate = require('./controller/authenticate')(passport);

var app = express();

//LOAD DIR
app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/views"));
app.use(express.static(__dirname + "/public/views/partials"));
app.use('/bower_components', express.static(__dirname + "/bower_components"));


//MIDDLEWARE
app.use(logger('dev'));
//CREATE SECRET FOR USER LOGIN
app.use(session({
  secret: 'DarkKnight',
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 10
  },
  saveUninitialized: true,
  resave: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

//PASSPORT INITIALIZE
app.use(passport.initialize());
app.use(passport.session());





//ROUTES
var index = require('./controller/index.js');
var authenticate = require('./controller/authenticate.js');

app.use('/', index);
//app.use('/api', api);
app.use('/auth', authenticate);
// app.use('/auth/example',
//      passport.authenticate('oauth2'), function (req, res){
//       console.log("did something: ");
//       if(err){
//         console.log("err: "+err);
//       } else {
//         res.render("oauth2 with passport did something")
//       };
// });

app.listen(PORT, function() {
  console.log("Application is listening on PORT:" + PORT);
});
