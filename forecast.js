// var express = require('express');
// var app = express();
// var Forecast = require('forecast');

// var options = {
//   forecast_api_key: process.env.FORECAST_API_KEY
// };
// app.set('options', options);

// var forecast = new Forecast({
//   service: 'forecast.io',
//   key: app.get('options').forecast_api_key,
//   units: 'celcius',
//   cache: true,
//   ttl: {
//     minutes: 27,
//     seconds: 45
//   }
// });

// forecast.get([35.659117, 139.703691], function(err, weather){
//   if(err) return console.dir(err);
//   console.dir(weather);
// });


// weather = require('openweathermap');

// weather.defaults({
//   units: 'metric',
//   lang: 'en',
//   mode: 'json'
// });

// weather.daily({
//   id: 1850147,
//   cnt: 3
// }, function(err, json){
//   console.dir(json);
// });


var http = require('http');
var url = 'http://weather.livedoor.com/forecast/webservice/json/v1?city=130010';
http.get(url, function(res){
    var body = '';
    res.setEncoding('utf8');

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(res){
        result = JSON.parse(body);
        console.log(
          '今日の天気：' + result.forecasts[0].telop + ' / ' +
          '最高気温：' + result.forecasts[0].temperature.max.celsius + '度'
        );
    });
}).on('error', function(e){
    console.log(e.message); //エラー時
});