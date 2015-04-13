var express = require('express');
var app = express();

// 環境変数から Titter アプリケーションのキー等を取得
var options = {
  twitter_key: process.env.TWITTER_KEY,
  twitter_secret: process.env.TWITTER_SECRET,
  twitter_token: process.env.TWITTER_TOKEN,
  twitter_token_secret: process.env.TWITTER_TOKEN_SECRET,
  test: process.env.TEST
};
app.set('options', options);

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Ozora Otenki')
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

module.exports = app;