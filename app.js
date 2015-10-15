var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes/index');
var coffeeMiddleware = require('coffee-middleware');
var stylus = require('stylus');
var nib = require('nib');

// ozora-otenki options
var options = {
  twitter_key: process.env.TWITTER_KEY,
  twitter_secret: process.env.TWITTER_SECRET,
  twitter_token: process.env.TWITTER_TOKEN,
  twitter_token_secret: process.env.TWITTER_TOKEN_SECRET,
  database_url: process.env.DATABASE_URL,
  opanweathermap_api_ey: process.env.OPENWEATHERMAP_API_KEY
};
app.set('options', options);

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use(stylus.middleware({
  src: path.join(__dirname, 'assets'),
  compile: function(str, path){
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib());
  }
}));
app.use(coffeeMiddleware({
  src: path.join(__dirname, 'assets'),
  compress: true
}));
app.use(express.static(path.join(__dirname, 'assets')));

app.get('/', routes.index);

app.listen(app.get('port'), function() {
  console.log('ｱｲ…ｶﾂ…ｱｲ…ｶﾂ…:' + app.get('port'));
});

module.exports = app;