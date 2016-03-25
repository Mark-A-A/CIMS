var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var PORT = process.env.PORT | 3000;

app.use(logger('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/', function(req, res){
  res.send('index.html');
});

app.listen(PORT, function(req, res){
  console.log('Listening on PORT ' + PORT);
});
