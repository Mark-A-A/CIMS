var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var Article = require('../model/article');
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
          var img = $(this).find('img').attr('src');
          var title = $(this).find('.headline').find("strong").text();
          var link = $(this).find("a").attr('href');
          var body =$(this).find('.headline').find("em").text();

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
              console.log("SUCCESS")
            }
          });
        });
      });
    }// end if statement
  });// END first request
  request('http://www.webmd.com/news/', function(err, response, body){
    if (!err && response.statusCode == 200){

      $ = cheerio.load(body);

      $('#more-news').each(function(i, element){
        $(element).find('li').each(function(){
          var link = $(this).attr('href') ;
          var title = $(this).text();

          var article = new Article({
            title: title,
            link: link,
            provider: "web-md"
          });

          article.save(function(err, document){
            if(err) {
              return res.send("ERROR: " + err);
            }
          });
        });
      });
    } // end if statement
    console.log('Scrape Done!');
  }); // end http scrape
  mongoose.model('Article').find(function(err, docs){
    if(!err){
      res.send(docs);
    }
  });
}); // end scraper route



module.exports = router;
