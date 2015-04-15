var pg = require('pg');
require('date-utils');

// var connectionString = process.env.DATABASE_URL
//     || "tcp://ユーザID:パスワード@localhost:5432/データベース名";
// var connectionString = app.get('options').database_url;
var connectionString = process.env.DATABASE_URL || 'tcp://localhost:5432/mylocaldb';
pg.connect(connectionString, function(error, client) {
  // // 接続したときの処理
  // var query = client.query('select * from table_test;');
  // var rows = [];
  // // row取得したら
  // query.on('row', function(row) {
  //   rows.push(row);
  // });
  // // 処理終了時
  // query.on('end', function(row,err) {
  //   console.log(rows);
  // });
  // // エラー時
  // query.on('error', function(error) {
  //   console.log(error);
  // });

  var d = new Date();
  var time = d.toFormat("YYYY-MM-DD");
  var telop = '曇りのち晴れ';
  var temp_max = 20;
  var temp_min = 11;
  var queryCmd = 'INSERT INTO weather_logs (date,telop,temp_max,temp_min) values ('+ "'" + time + "'" + ',' + "'" + telop + "'" + ',' + temp_max + ',' + temp_min + ');';
  var query = client.query(queryCmd);
  console.log(queryCmd);
  var query = client.query('select * from weather_logs;');
  var rows = [];
  // row取得したら
  query.on('row', function(row) {
    // rows.push(row);
  });
  // 処理終了時
  query.on('end', function(row,err) {
    console.log(rows);
  });
});