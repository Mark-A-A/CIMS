var cheerio = require('cheerio');
var request = require('request');
var Article = require('../model/articles');

request('http://http://www.webmd.com/news/', function(err, response, body){
  if (!error && response.statusCode == 200){

    $ = cheerio.load(body);

    $('#more-news').each(function(i, element){
      $(element).find('li').each(function(){
        var link = $(this).attr('href') ;
        var title = $(this).text();
      });

      var article = new Article({
        title: title,
        link: link
      });

      article.save(function(err, document){
        if(err) {
          return res.send("ERROR: " + err);
        };
      });
    });
  } // end if statement
  res.send('Scrape Done!')
}); // end http scrape
