var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.use(function(req,res,next){

  if(req.method === "GET") {
    return next();
  }

  if(!req.isAuthenticated()){
    //user not authenticated, redirect to login page
    return res.redirect('/#login');
  }
  //user authenticated redirect to next page
  return next();
});

module.exports = router;
