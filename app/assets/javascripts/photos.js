$().ready(function() {
  $("#user-camera-photos > div").hide();
  $('#loading-photos').fadeTo(2600, 0);
  $('#start').fadeIn(300);

  $('#start').click(function() {
    $("#user-camera-photos").removeClass('whiteout');
    $("#user-camera-photos > img").removeClass('whiteout');
    $(".photo > img").removeClass('photo');
    // $("#user-camera-photos > div:first").show();
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
