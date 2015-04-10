// var express = require('express');
// var app = express();
//
// var options = {
//   forecast_api_key: process.env.FORECAST_API_KEY
// };
// app.set('options', options);
// var key = app.get('options').forecast_api_key;


var weather = require('openweathermap');
var http = require('http');
var async = require('async');
require('date-utils');

var cityId = 1850147;
var url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010';

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
      var temp_max = Math.round(result.list[0].temp.max);
      var temp_min = Math.round(result.list[0].temp.min);
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
        var telop = result.forecasts[0].telop;
        callback(null, temp_max, temp_min, telop);
      });
    });
  },
  // output
  function(temp_max, temp_min, telop){
    var d = new Date();
    var time = d.toFormat("HH24時MI分");

    var text =
      '時刻は' + time + '\u2757 \n' +
      '今日のお空はどんな空〜\u2753 大空お天気の時間です\u2728 \n' +
      '今日の都心部は' + telop + '\u2757 ️\n' +
      '最高気温は' + temp_max + '度、' + '最低気温は' + temp_min + '度です\u2b50 ️\n' +
      '通勤・通学気をつけて、行ってらっしゃ〜い\u2728';
    console.log(text);
  }
]);