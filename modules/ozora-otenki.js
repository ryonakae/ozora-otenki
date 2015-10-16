var app = require('../app');
var twit = require('twit');
var cronJob = require('cron').CronJob;
var http = require('http');
var async = require('async');
var fs = require('fs');
var pg = require('pg');
require('date-utils');

var superagent = require("superagent");
var superagentJsonp = require("superagent-jsonpx");


var twitter = new twit({
  consumer_key: app.get('options').twitter_key,
  consumer_secret: app.get('options').twitter_secret,
  access_token: app.get('options').twitter_token,
  access_token_secret: app.get('options').twitter_token_secret
});


// 秒 分 時 日 月 週
var crontime = '0 30 8 * * *'; //毎日朝8時半
// var crontime = '1-59/2 * * * *'; //1-59分の間で2分ごと
// var crontime = '*/15 * * * *'; //15分ごと
// var crontime = '*/10 * * * * *'; //10秒ごと


var job = new cronJob({
  cronTime: crontime,
  onTick: function() {
    // デバッグ：true, 本番：false
    twitterTweet(false);
    console.log('毎朝ツイートをするのも、立派なアイカツ\u2757');
  },
  start: false,
  timeZone: 'Asia/Tokyo'
});
job.start();


// デバッグ用：関数をソッコーで実行
// twitterTweet(true);


function twitterTweet(debugMode){
  // common variables
  var city, country, telop_en, temp_max, temp_min, telop;

  // twitter用画像の設定
  var imagePath = './assets/images/twitter_images/'; // プロジェクトルートからの相対パス
  var imageCount = 26; // フォルダ内の画像の総数

  // openweathermap parameter
  var openWeatherMapUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily';
  var openWeatherMapId = 1850147;
  var openWeatherMapApiKey = app.get('options').opanweathermap_api_key;

  // livedoor weather hacks parameter
  var livedoorWeatherHacksUrl = 'http://weather.livedoor.com/forecast/webservice/json/v1';
  var livedoorWeatherHacksId = 130010;

  async.waterfall([
    // before start
    function(callback){
      console.log('私のアツいアイドル活動、アイカツ！始まります\u2728');
      callback(null);
    },

    // get openweathermap
    function(callback){
      superagent
        .get(openWeatherMapUrl)
        .query({
          id: openWeatherMapId,
          cnt: 3,
          units: 'metric', //温度を摂氏に
          APPID: openWeatherMapApiKey
        })
        .use(superagentJsonp({
          timeout: 10000
        }))
        .end(function(err, res){
          city = res.body.city.name
          country = res.body.city.country;
          telop_en = res.body.list[0].weather[0].description;

          if( res.body.list[0].temp.max != null ){
            temp_max = Math.round(res.body.list[0].temp.max);
          } else {
            temp_max = '-';
          }

          if( res.body.list[0].temp.min != null ){
            temp_min = Math.round(res.body.list[0].temp.min);
          } else {
            temp_min = '-';
          }

          callback(null, city, country, telop_en, temp_max, temp_min);
        });
    },

    // get livedoor weather hacks
    function(city, country, telop_en, temp_max, temp_min, callback){
      superagent
        .get(livedoorWeatherHacksUrl)
        .query({
          city: livedoorWeatherHacksId
        })
        .use(superagentJsonp({
          timeout: 10000
        }))
        .end(function(err, res){
          telop = res.body.forecasts[0].telop;

          callback(null, city, country, telop_en, temp_max, temp_min, telop);
        });
    },

    // tweet or debug(console.log)
    function(city, country, telop_en, temp_max, temp_min, telop){
      var d = new Date();
      var time = d.toFormat("HH24時MI分");

      // ツイート文言
      var text =
        '時刻は' + time + '\u2757 ' +
        '今日のお空はどんな空〜\u2753 大空お天気の時間です\u2728 ' +
        '今日の都心部は' + telop + '\u2757️ ' +
        '最高気温は' + temp_max + '度、' + '最低気温は' + temp_min + '度です\u2b50 ' +
        'それでは通勤通学気をつけて、行ってらっしゃ〜い\u2728️';

      // 添付する画像
      var imageNum = Math.floor(Math.random() * imageCount) + 1;
      // ファイル番号整形
      if(imageNum < 10){
        imageNum = '00' + imageNum;
      }
      else if(10 <= imageNum <= 99){
        imageNum = '0' + imageNum;
      }

      // 画像をアップロード&ツイート&データベースに値を保存
      if ( debugMode === false ) {
        // 画像をbase64エンコードしてStreamに追加
        var image = fs.readFileSync(imagePath + imageNum + '.jpg', { encoding:'base64' });

        twitter.post('media/upload', { media: image }, function(err, data, response) {
          // アップロードした画像の情報を取得
          var mediaId = data.media_id_string;
          var tweetContent = {
            status: text,
            media_ids: [mediaId]
          };

          // 文言を画像と一緒にポスト
          twitter.post('statuses/update', tweetContent, function(err, data, response) {
            // ツイートし終わったらデータベースに値入れるぞ
            var connectionString = process.env.DATABASE_URL || 'tcp://localhost:5432/mylocaldb';
            pg.connect(connectionString, function(error, client, done){
              time = d.toFormat("YYYY-MM-DD");
              var queryCmd = 'INSERT INTO weather_logs (date,telop,temp_max,temp_min,city,country,telop_en) values ('+ "'"+time+"'" +','+ "'"+telop+"'" +','+ temp_max +','+ temp_min +','+ "'"+city+"'" +','+ "'"+country+"'" +','+ "'"+telop_en+"'" +');';
              var query = client.query(queryCmd, function(error, result){
                done();
                console.log('おつか〜\u2600');
              });
            });
          });
        });
      }

      // デバッグ用：consoleに結果出力
      if ( debugMode === true ) {
        var image = imagePath + imageNum + '.jpg';

        console.log( 'Tweet: ' + text + ', Image: ' + image);
      }
    }
  ]);
}