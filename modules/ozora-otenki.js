var app = require('../app');
var twit = require('twit');
var cronJob = require('cron').CronJob;
var weather = require('openweathermap');
var http = require('http');
var async = require('async');
var fs = require('fs');
require('date-utils');


var twitter = new twit({
  consumer_key: app.get('options').twitter_key,
  consumer_secret: app.get('options').twitter_secret,
  access_token: app.get('options').twitter_token,
  access_token_secret: app.get('options').twitter_token_secret
});

// openweathermap
var cityId = 1850147;
// livedoor weather hacks
var url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010';

// 秒 分 時 日 月 週
var cronTime = '0 30 8 * * *'; //毎日朝8時半
// var cronTime = '1-59/2 * * * *'; //1-59分の間で2分ごと
var cronTime = '*/15 * * * *'; //15分ごと


new cronJob({
  cronTime: cronTime,
  onTick: function() {
    tweet();
  },
  start: true,
  timeZone: 'Asia/Tokyo'
});
console.log('稼働中なう');


function tweet(){
  async.waterfall([
    // openweathermap
    function(callback){
      weather.defaults({
        units: 'metric',
        lang: 'en',
        mode: 'json'
      });
      weather.daily({
        id: cityId,
        cnt: 2
      }, function(err, result){
        if(result.list[0] != null){
          if(result.list[0].temp.max != null){
            var temp_max = Math.round(result.list[0].temp.max);
          } else {
            var temp_max = '-';
          }
          if(result.list[0].temp.min != null){
            var temp_min = Math.round(result.list[0].temp.min);
          } else {
            var temp_min = '-';
          }
        }
        else {
          var temp_max = '-';
          var temp_min = '-';
        }
        callback(null, temp_max, temp_min);
      });
    },
    // livedoor weather hacks
    function(temp_max, temp_min, callback){
      http.get(url, function(res){
        var body = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk){
          body += chunk;
        });
        res.on('end', function(res){
          result = JSON.parse(body);
          if(result.forecasts[0].telop != null){
            var telop = result.forecasts[0].telop;
          } else {
            var telop = '-';
          }
          callback(null, temp_max, temp_min, telop);
        });
      });
    },
    // tweet
    function(temp_max, temp_min, telop){
      var d = new Date();
      var time = d.toFormat("HH24時MI分");

      // ツイート文言
      var text =
        '時刻は' + time + '\u2757 ' + '今日のお空はどんな空〜\u2753 大空お天気の時間です\u2728\n' +
        '今日の都心部は' + telop + '\u2757️ ' + '最高気温は' + temp_max + '度、' + '最低気温は' + temp_min + '度です\u2b50\n' +
        '通勤・通学気をつけて、行ってらっしゃ〜い\u2728️';

      // 添付する画像
      var imagePath = './source/images/'; // プロジェクトルートからの相対パス
      var imageCount = 11; // フォルダ内の画像の総数
      var imageNum = Math.floor(Math.random() * imageCount) + 1;

      if(imageNum < 10){
        imageNum = '00' + imageNum;
      }
      else if(10 <= imageNum <= 99){
        imageNum = '0' + imageNum;
      }

      // 画像をbase64エンコードしてStreamに追加
      var image = fs.readFileSync('./source/images/' + imageNum + '.jpg', { encoding:'base64' });

      // 画像をアップロード
      twitter.post('media/upload', { media: image }, function(err, data, response) {
        // アップロードした画像の情報を取得
        var mediaId = data.media_id_string;
        var tweetContent = {
          status: text,
          media_ids: [mediaId]
        };

        // 文言を画像と一緒にポスト
        twitter.post('statuses/update', tweetContent, function(err, data, response) {
          console.log('おつか〜');
        });
      });
    }
  ]);
};