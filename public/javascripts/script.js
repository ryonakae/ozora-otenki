$(document).ready(function(){
  var resizeTimer = false;

  $(window)
    .on('load', function(){
      // canvas
      setInterval(function(){
        drawCanvas();
      },10);

      // video play speed
      var video = document.getElementById('video');
      video.playbackRate = 2;

      // fadein
      setTimeout(function(){
        $('.container').addClass('container--shown');
      }, 500);
    })
    .on('resize', function(){
      if( resizeTimer !== false ){
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(function(){
        canvas.width = $(window).width();
        canvas.height = $(window).height();
      }, 200);
    });


  // canvas
  function drawCanvas(){
    // canvas initialize
    var canvas = document.getElementById('canvas');
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    var ctx = canvas.getContext('2d');
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    ctx.save();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // bg
    ctx.save();
    ctx.fillStyle = "rgba(235, 235, 235, 1)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // titletext
    ctx.save();
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "bold 360px 'Avenir Next'";
    ctx.fillText("OZORA", 0, -190);
    ctx.font = "bold 347px 'Avenir Next'";
    ctx.fillText("OTENKI", 0, -190+290);
    ctx.restore();

    // clock
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = toDoubleDigits(date.getMonth() + 1);
    var dd = toDoubleDigits(date.getDate());
    var hh = toDoubleDigits(date.getHours());
    var mi = toDoubleDigits(date.getMinutes()+1);
    var ss = toDoubleDigits(date.getSeconds());
    var ms = date.getMilliseconds();
    ms = ("00"+ms).slice(-3,-1);
    var time = yyyy + "/" + mm + "/" + dd + " " + hh + ":" + mi + ":" + ss + ":" + ms;
    ctx.save();
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "bold 107px 'Avenir Next'";
    ctx.fillText(time, 0, 300);
    ctx.restore();

    // weather
    // ctx.save();
    // ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    // ctx.textAlign = 'center';
    // ctx.textBaseline = 'middle';
    // // ctx.globalCompositeOperation = 'destination-out';
    // ctx.fillStyle = "rgb(0, 0, 0)";
    // ctx.font = "bold 100px 'Avenir Next'";
    // var weather_id = weather[0].id;
    // var weather_telop = weather[0].telop;
    // var weather_temp_max = weather[0].temp_max;
    // var weather_temp_min = weather[0].temp_min;
    // var weather_text = 'id:' + weather_id + '/telop:' + weather_telop;
    // ctx.fillText(weather_text, 0, 0);
    // ctx.restore();
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