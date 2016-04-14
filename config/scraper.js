var request = require('request');
var cheerio = require('cheerio');
var Article = require('../model/article');
var WebMD = require('../model/md-link');
var mongoose = require('mongoose');


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
          link: link
        });

        article.save(function(err, document){
          if(err) {
            console.log("ERROR: " + err);
          } else {
            //console.log("Scraped MNT");
          }
        });
      });
    });
  }// END if statement
});// END request



request('http://www.webmd.com/news/', function(err, response, body){
  if (!err && response.statusCode == 200){

    $ = cheerio.load(body);

    $('.moreNews_rdr').each(function(i, element){
      $(element).find('li').each(function(){
        var link = $(this).find('a').attr('href') ;
        var title = $(this).find('a').text();

        var webmd = new WebMD({
          title: title,
          link: link
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

