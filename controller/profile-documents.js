// var express = require('express');
// var router = express.Router();
// var mongojs = require('mongojs');
// var path = require('path');
// var aws = require('aws-sdk');

// var docsDb = mongojs("cims-db",["documents"]);

// var Keys = require("../.env");
// //var Keys = process.env.Keys;

// console.log(Keys);
// console.log("Keys.AWS......"+ Keys.AWS);

// docsDb.on('error',function(err){
//   console.log('database error: '+err);
// });

// module.exports = function (){
//   // router.get('/success',function(req,res){
//   //   console.log(req.username);
//   //   res.send({state:'success',username:req.username ? req.username : null});
//   // });


//   router.get('/sign_s3', function (req, res) {
//     debugger
//     aws.config.update({accessKeyId: Keys.AWS.ACCESS_KEY, secretAccessKey: Keys.AWS.SECRET_KEY});
//     var s3 = new aws.S3();
//     var s3_params = {
//         Bucket: Keys.AWS.S3_BUCKET,
//         Key: req.query.file_name,
//         Expires: 60,
//         ContentType: req.query.file_type,
//         ACL: 'public-read'
//     };
//     s3.getSignedUrl('putObject', s3_params, function(err, data){
//       if (err) {
//         debugger
//         console.log("error: "+ err);
//       }
//       else {
//         debugger
//         var return_data = {
//           signed_request: data,
//           url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
//         };
//         console.log("data url returned: "+ sreturned_data.url)
//         res.write(JSON.stringify(return_data));
//         //res.end();
//         res.send("got the file");
//       }
//     });
//   });


//   router.post('/submit_form', function (req, res) {
//     debugger
//     username = req.body.username;
//     full_name = req.body.full_name;
//     avatar_url = req.body.avatar_url;
//     update_account(username, full_name, avatar_url); // TODO: create this function
//     // TODO: Return something useful or redirect
//     console.log("doing something");
//     console.log("need to make function to add documents to DB");

//     res.send("req.bod.avatar_url: "+ avatar_url);

//   });
// }

