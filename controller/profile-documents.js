var express = require('express');
var logout = require('express-passport-logout');
var router = express.Router();
var mongojs = require('mongojs');
var path = require('path');
var aws = require('aws-sdk');

var docsDb = mongojs("cims-db",["documents"]);

var Keys = require("../.env");
//var Keys = process.env.Keys;

debugger
console.log(Keys);

console.log("Keys.AWS......"+ Keys.AWS);

docsDb.on('error',function(err){
  console.log('database error: '+err);
});

module.exports = function (){
  // router.get('/success',function(req,res){
  //   console.log(req.username);
  //   res.send({state:'success',username:req.username ? req.username : null});
  // });


  router.get('/sign_s3', function(req, res){
    debugger
    aws.config.update({accessKeyId: Keys.AWS.ACCESS_KEY, secretAccessKey: Keys.AWS.SECRET_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: Keys.AWS.S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
      if(err){
        console.log(err);
      }
      else{
        var return_data = {
          signed_request: data,
          url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
        };
        res.write(JSON.stringify(return_data));
        res.end();
      }
    });
  });
}