var app = require('../app');
var pg = require('pg');
var uaParser = require('ua-parser-js');

exports.index = function(request, response){
  // UA
  var parser = new uaParser();
  var ua = request.headers['user-agent'];
  var ua = parser.setUA(ua).getResult();

  // データベースの値取り出すぞい
  var connectionString = process.env.DATABASE_URL || 'tcp://localhost:5432/mylocaldb';
  pg.connect(connectionString, function(error, client, done){
    var queryCmd = 'select * from weather_logs order by id desc offset 0 limit 1;';
    var query = client.query(queryCmd);
    var rows = [];
    query.on('row', function(row) {
      rows.push(row);
    });
    query.on('end', function(row,err) {
      response.render('index', {
        title: 'Ozora Otenki',
        description: '今日のお空はどんな空〜❓ 大空お天気の時間です✨',
        url: 'http://ozora-otenki.herokuapp.com/',
        image: 'https://s3-ap-northeast-1.amazonaws.com/ozora-otenki/images/akari-ozora.jpg',
        twitter_site: '@ozr_otenki',
        weather: rows,
        ua: ua.os.name
      });
      done();
      console.log('ﾌﾌｯﾋ\u2728');
    });
  });
}