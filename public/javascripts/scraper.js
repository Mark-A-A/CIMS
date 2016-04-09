var request = require('request');
var cheerio = require('cheerio');
var Article = mongoose.model('Article');

request('http://www.webmd.com/news/', function(err, response, body){
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
        }
      });
    });
  } // end if statement
  console.log('Scrape Done!');
}); // end http scrape

// request('http://www.news-medical.net/', function(err, response, body){
//   if (!error && response.statusCode == 200) {
//     $ = cheerio.load(body);

//     $('.common-img-list').each(function(i, element){
//       $(element).find('li').each(function(){
//         var img = $(this).find('img').attr('src');
//         var text = $(this).find('.common-img-list-text').text();
//         var link = $(this).find('.common-img-list-text').attr('href')
//       });

//       // add code to save to db
//     });
//   }
// });
