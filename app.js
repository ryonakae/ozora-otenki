var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes/index');
var coffeeMiddleware = require('coffee-middleware');
var stylus = require('stylus');
var nib = require('nib');
var favicon = require('serve-favicon');

// ozora-otenki options
var options = {
  twitter_key: process.env.TWITTER_KEY,
  twitter_secret: process.env.TWITTER_SECRET,
  twitter_token: process.env.TWITTER_TOKEN,
  twitter_token_secret: process.env.TWITTER_TOKEN_SECRET,
  database_url: process.env.DATABASE_URL
};
app.set('options', options);

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(stylus.middleware({
  src: path.join(__dirname, 'public'),
  compile: function(str, path){
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib());
  }
}));
app.use(coffeeMiddleware({
  src: path.join(__dirname, 'public'),
  compress: true
}));
app.use(favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;