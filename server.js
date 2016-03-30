var express = require('express');
var path = require('path');
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var PORT = 3000;

//connect to Mongodb
mongoose.connect("mongodb://localhost/doctor-app");
require('./model/users.js');

var index = require('./controller/index');
var api = require('./controller/api');
var authenticate = require('./controller/authenticate')(passport);

var app = express();

app.use(logger('dev'));
app.use(session({
  secret: 'Super secret'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));
app.use('/public', express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/views"));
app.use(express.static(__dirname + "/public/views/partials"));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

var initPassport = require('./passport-init');
initPassport(passport);

app.use('/', index);
app.use('/api', api);
app.use('/auth', authenticate);

app.listen(PORT, function() {
  console.log("Application is listening on PORT:" + PORT)
});
