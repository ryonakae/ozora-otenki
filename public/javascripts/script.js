$(document).ready(function(){
  var resizeTimer = false;

  function setContentHeight(){
    $('.container').css({
      width: $(window).width(),
      height: $(window).width()/16*9
    });
  };

  $(window).on('load', function(){
    setContentHeight();

    // video play speed
    var video = document.getElementById('video');
    if( video != null ){
      video.playbackRate = 2;
    }

    // fadein
    setTimeout(function(){
      $('.container').addClass('container--shown');
    }, 1000);
  });
  $(window).on('resize', function(){
    if( resizeTimer !== false ){
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function(){
      setContentHeight();
    }, 200);
  });
});