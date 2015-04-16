$(window).on('load', function(){
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