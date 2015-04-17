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

    // tumblr gif
    var gif = document.getElementById('gif');
    if( gif != null ){
      TumblrImager.init({
        json: tumblr_api_read,
        containerSelector: '#gif'
      });
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