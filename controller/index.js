var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var Article = require('../model/article');
var WebMD = require('../model/md-link');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log("request is " + req.user.username);
  res.send('/public/views/index.html');
});

router.get('/scraper', function(req, res, next){
  request('http://www.medicalnewstoday.com/', function(err, response, body){
    if (!err && response.statusCode == 200 ) {

      $ = cheerio.load(body);

      $('.writtens_top').each(function(i, element){
        $(element).find('li').each(function(){
          var img = $(this).find('img').attr('data-src');
          var title = $(this).find('.headline').find('strong').text();
          var link = $(this).find('a').attr('href');
          var body =$(this).find('.headline').find('em').text();

          var article = new Article({
            img: img,
            title: title,
            body: body,
            link: link,
            provider: "med-news"
          });

          article.save(function(err, document){
            if(err) {
              console.log("ERROR: " + err);
            } else {
              console.log("Scraped MNT");
            }
          });
        });
      });
    }// END if statement
  });// END request
  mongoose.model('Article').find(function(err, docs){
    if(!err) {
      res.send(docs);
    }
  });
}); // end scraper route


router.get('/webmd', function(req, res, next) {
  request('http://www.webmd.com/news/', function(err, response, body){
    if (!err && response.statusCode == 200){

      $ = cheerio.load(body);

      $('#more-news').each(function(i, element){
        $(element).find('li').each(function(){
          var link = $(this).attr('href') ;
          var title = $(this).text();

          var webmd = new WebMD({
            title: title,
            link: link,
            provider: "web-md"
          });

          webmd.save(function(err, document){
            if(err) {
              console.log("ERROR: " + err);
            } else {
              console.log("Scraped WebMD!");
            }
          });
        });
      });
    } // end if statement
  }); // end web-md scrape
  mongoose.model('WebMD').find(function(err, docs){
    if(!err){
      res.send(docs);
    }
  });
});

module.exports = router;



