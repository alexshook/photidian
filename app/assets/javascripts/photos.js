$().ready(function() {
  $('#loading-photos').fadeTo(2600, 0);

  $('#start').click(function() {
    $("#user-camera-photos").removeClass('whiteout');
    $("#user-camera-photos > img").removeClass('whiteout');
    $(".photo > img").removeClass('photo');
    // $("#user-camera-photos > div:first").fadeIn(1000);
    setInterval(function() {
      $('#user-camera-photos > div:first')
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo('#user-camera-photos');
    },  1000);
  });

});
