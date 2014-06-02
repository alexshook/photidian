$().ready(function() {

  $('#slideshow').click(function() {
  $('#user-camera-photos > div:gt(0)').hide();
    setInterval(function(){
      $('#user-camera-photos > div:first')
        .fadeOut(300)
        .next()
        .fadeIn(300)
        .end()
        .appendTo('#user-camera-photos');
    }, 1000);
  });

});
