var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log("request is " + req.user.username);
  res.send('/public/views/index.html');
});

router.get('/articles', function(req, res, next) {
  db.articles.find({},function (err, docs) {
    //console.log(docs);
    res.json(docs);
  });
});

module.exports = router;
