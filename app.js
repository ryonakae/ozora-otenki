var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var coffeeMiddleware = require('coffee-middleware');
var stylus = require('stylus');
var nib = require('nib');

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



// passport
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var TWITTER_CONSUMER_KEY = 'SublRTKwLZZVt30Xm24xDXLzS';
var TWITTER_CONSUMER_SECRET = 'cjdC2dzfXiCdCW4o2G1498y5oirL9vssHoKGBbST5mtxIHmrgp';

// passport
passport.serializeUser(function(user, done){
  done(null, user);
});
passport.deserializeUser(function(obj, done){
  done(null, obj);
});

// PassportでTwitterStrategyを使うための設定
passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:3000/auth/twitter/callback"
},
function(token, tokenSecret, profile, done) {
    profile.twitter_token = token;
    profile.twitter_token_secret = tokenSecret;

    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

app.use(cookieParser());
app.use(session({
  secret: "hogehoge",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', routes.login);

// Twitterの認証
app.get("/auth/twitter", passport.authenticate('twitter'));

// Twitterからのcallback
app.get("/auth/twitter/callback", passport.authenticate('twitter', {
  successRedirect: '/timeline',
  failureRedirect: '/login'
}));

// タイムラインの表示
// app.get('/timeline', function(req,res){
//   var userId = req.user.username;
// });
app.get('/timeline', routes.timeline);

// logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});




app.listen(app.get('port'), function() {
  console.log('ｱｲ…ｶﾂ…ｱｲ…ｶﾂ…:' + app.get('port'));
});

module.exports = app;