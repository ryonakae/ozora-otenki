var express = require('express');
var app = express();
var path = require('path');

// ozora-otenki options
var options = {
  twitter_key: process.env.TWITTER_KEY,
  twitter_secret: process.env.TWITTER_SECRET,
  twitter_token: process.env.TWITTER_TOKEN,
  twitter_token_secret: process.env.TWITTER_TOKEN_SECRET
};
app.set('options', options);

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  response.render('index', { title:'Ozora Otenki' })
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

module.exports = app;