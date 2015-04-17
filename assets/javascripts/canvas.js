$(document).ready(function(){
  var resizeTimer = false;

  var drawInterval;
  function startInterval(){
    drawInterval = setInterval(function(){
      drawCanvas();
    },1000);
  };
  function stopInterval(){
    clearInterval(drawCanvas);
  };

  $(window).on('load', function(){
    startInterval();
  });
  $(window).on('resize', function(){
    if( resizeTimer !== false ){
      clearTimeout(resizeTimer);
      stopInterval();
    }
    resizeTimer = setTimeout(function(){
      startInterval();
    }, 200);
  });


  // canvas
  function drawCanvas(){
    // canvas initialize
    var canvas = document.getElementById('canvas');
    // canvas.width = $(window).width();
    // canvas.height = $(window).height();
    var ctx = canvas.getContext('2d');
    var canvasWidth = canvas.getAttribute('width');
    var canvasHeight = canvas.getAttribute('height');
    ctx.save();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // bg
    ctx.save();
    ctx.fillStyle = "rgba(242, 242, 242, 1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // titletext
    ctx.save();
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.scale(0.9,0.9);
    ctx.font = "bold 740px 'Avenir Next'";
    ctx.fillText("OZORA", -10-10, -400-45);
    ctx.font = "bold 730px 'Avenir Next'";
    ctx.fillText("OTENKI", 20-10, 200-45);
    ctx.restore();

    // clock
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = toDoubleDigits(date.getMonth() + 1);
    var dd = toDoubleDigits(date.getDate());
    var hh = toDoubleDigits(date.getHours());
    var mi = toDoubleDigits(date.getMinutes()+1);
    var ss = toDoubleDigits(date.getSeconds());
    // var ms = date.getMilliseconds();
    // ms = ("00"+ms).slice(-3,-1);
    // var time = yyyy + "/" + mm + "/" + dd + " " + hh + ":" + mi + ":" + ss + ":" + ms;
    var time = yyyy + "/" + mm + "/" + dd + " " + hh + ":" + mi + ":" + ss;
    ctx.save();
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "bold 150px 'Avenir Next'";
    ctx.fillText(time, 0, 510-45);
    ctx.restore();

    // weather
    ctx.save();
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = 'bold 120px "Avenir Next", Avenir, "Helvetica Neue", Helvetica, Arial, "游ゴシック", YuGothic, "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic ProN", "メイリオ", Meiryo';
    var weather_id = weather[0].id;
    var weather_telop = weather[0].telop;
    var weather_temp_max = weather[0].temp_max;
    var weather_temp_min = weather[0].temp_min;
    var weather_city = weather[0].city.toUpperCase();
    var weather_country = weather[0].country.toUpperCase();
    var weather_telop_en = weather[0].telop_en.toUpperCase();
    var weather_text = weather_city + ', ' + weather_country + ' ' +  weather_telop_en + ' ' + weather_temp_max + '°C/' + weather_temp_min + '°C';
    ctx.fillText(weather_text, 0, 670-45);
    ctx.restore();
  };


  // ゼロパディング
  var toDoubleDigits = function(num) {
    num += "";
    if (num.length === 1) {
      num = "0" + num;
    }
    return num;
  };
});