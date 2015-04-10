var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.get('/', function (req, res) {
  res.render('index', { title : 'Ozora Otenki' });
});
app.listen(3000);