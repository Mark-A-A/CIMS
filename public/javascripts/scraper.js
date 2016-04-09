var request = require('request');
var cheerio = require('cheerio');
var Article = mongoose.model('Article');

request('http://www.medicalnewstoday.com/', function(err, response, body){
  if (!error && response.statusCode == 200 ) {

    $cheerio.load(body);

    $('.writtens_top').each(function(i, element){
      $(element).find('li').each(function(){
        var img = $(this).find('img').attr('src');
        var title = $(this).find('.headline').find("strong").text();
        var link = $(this).find("a").attr('href');
        var body =$(this).find('.headline').find("em").text();
      });

      var article = new Article({
        img = img,
        title = title,
        body = body,
        link = link
      });

      article.save(function(err, document){
        if(err) {
          return res.send("ERROR: " + err);
        }
      });
    });
  }// end if statement
  //console.log('Scraped MNT!');
});

// request('http://www.webmd.com/news/', function(err, response, body){
//   if (!error && response.statusCode == 200){

//     $ = cheerio.load(body);

//     $('#more-news').each(function(i, element){
//       $(element).find('li').each(function(){
//         var link = $(this).attr('href') ;
//         var title = $(this).text();
//       });

//       var md-article = new WebMD({
//         title: title,
//         link: link
//       });

//       md-article.save(function(err, document){
//         if(err) {
//           return res.send("ERROR: " + err);
//         }
//       });
//     });
//   } // end if statement
//   console.log('Scrape Done!');
// }); // end http scrape
