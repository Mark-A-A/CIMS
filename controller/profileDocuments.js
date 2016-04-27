var dotenv  = require('dotenv').config();
var express = require('express');
var router = express.Router();

var path = require('path');
var aws = require('aws-sdk');

debugger
console.log('controller for documents hit');

debugger
var Keys = process.env;
console.log("Keys: "+ Keys);
console.log("Keys.ACCESS_KEY_ID: " + Keys.ACCESS_KEY_ID);

// var Keys = process.env.AWS;
// console.log("Keys: "+Keys);


// var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
// var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
// var S3_BUCKET      = process.env.S3_BUCKET;


// console.log ("S3_BUCKET: "+S3_BUCKET);

// docsDb.on('error',function(err){
//   console.log('database error: '+err);
// });

  // router.get('/success',function(req,res){
  //   console.log(req.username);
  //   res.send({state:'success',username:req.username ? req.username : null});
  // });


  // router.get('/test', function(req, res){
  //   res.send("OMG a route got hit -profileDocs ctrl!!!");
  // });

  router.get('/sign_s3', function (req, res) {
    
    console.log("/sign_s3 hit!!!")
    aws.config.update({accessKeyId: Keys.ACCESS_KEY_ID, secretAccessKey: Keys.SECRET_ACCESS_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: Keys.S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
      if (err) {
       
        console.log("error: "+ err);
      }
      else {
       
        console.log("signing url -profiledocs")
        var return_data = {
          signed_request: data,
          url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
        };

        console.log("data url returned: "+ return_data.url)
        res.write(JSON.stringify(return_data));
        res.end();
        // res.send("got the file");
      }
    });
  });


  router.post('/submit_form', function (req, res) {
    
    username = req.body.username;
    full_name = req.body.full_name;
    avatar_url = req.body.avatar_url;
    update_account(username, full_name, avatar_url); // TODO: create this function
    // TODO: Return something useful or redirect
    console.log("doing something");
    console.log("need to make function to add documents to DB");

    res.send("req.bod.avatar_url: "+ avatar_url);

  });

module.exports = router;



// var express = require('express');
// var knox = require('knox');

// var app = express();
// app.use(express.bodyParser());

// var s3 = knox.createClient({
//     key: process.env.AWS_ACCESS_KEY_ID,
//     secret: process.env.AWS_SECRET_ACCESS_KEY,
//     bucket: process.env.S3_BUCKET_NAME
// });

// app.post('/upload', function(req, res, next) {
//     var photo = req.files.photo;
//     var s3Headers = {
//       'Content-Type': photo.type,
//       'x-amz-acl': 'public-read'
//     };

//     s3.putFile(photo.path, photo.name, s3Headers, function(err, s3response){
//       //handle, respond
//     });
// });

