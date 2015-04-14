$(document).ready(function(){
  // canvas
  // initialize
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // load and resize
  $(window).on('load resize', function(){
    canvas.width = $(window).width();
    canvas.height = $(window).height();

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    // bg
    ctx.save();
    ctx.fillStyle = "rgba(235, 235, 235, 0.93)";
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
    ctx.restore();

    // text
    ctx.save();
    ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "bold 360px 'Avenir Next'";
    ctx.fillText("OZORA", 0, -150, 9999);
    ctx.fillText("OTENKI", 0, 160, 9999);
    ctx.restore();

    // ctx.fillStyle = "rgb(0, 0, 0)";
    // ctx.font = "Bold 100px 'Avenir Next'";
    // ctx.fillText("OZORA", 0, 100);
  });

  $(window).on('load', function(){
    // video play speed
    var video = document.getElementById('video');
    video.playbackRate = 1.5;

    // fadein
    setTimeout(function(){
      $('.container').addClass('container--shown');
    }, 500);
  });
});