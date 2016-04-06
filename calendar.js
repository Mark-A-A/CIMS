var express = require("express");
var oauth = require('oauth');
var mongo = require('mongodb');
var gcal = require('google-calendar');
var q = require('q');

var oa;
var app = express();

var db = require('./config/db.js');

var clientId = '957745480092-1r7bkk9dvpitplo52lhvv0blkr703krf.apps.googleusercontent.com';
var clientSecret = 'uupb9bpbIU5QNYhsF6ZrQP7R';
var scopes = 'https://www.googleapis.com/auth/calendar';
var googleUserId;
var refreshToken;
var baseUrl;

app.configure('development',function(){
  console.log('!! DEVELOPMENT MODE !!');

  googleUserId = 'GOOGLE_EMAIL_ADDRESS';
  refreshToken = 'GOOGLE_REFRESH_TOKEN';
  baseUrl = 'DEV_API_URL';
});

app.configure('production', function(){
  console.log('!! PRODUCTION MODE !!');

  googleUserId = 'GOOGLE_EMAIL_ADDRESS';
  refreshToken = 'GOOGLE_REFRESH_TOKEN';
  baseUrl = 'PRODUCTION_API_URL';
});

