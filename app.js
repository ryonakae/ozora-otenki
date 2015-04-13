var express = require('express');
var app = express();

var options = {
  key: process.env.TWITTER_KEY,
  secret: process.env.TWITTER_SECRET,
  token: process.env.TWITTER_TOKEN,
  token_secret: process.env.TWITTER_TOKEN_SECRET
};
app.set('options', options);

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.get('/', function (req, res) {
  res.render('index', { title : 'Ozora Otenki' });
});
app.listen(3000);

module.exports = app;