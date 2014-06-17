$().ready(function() {
  $("#user-camera-photos > div").hide();
  $('#loading-photos').fadeTo(4600, 0);
  $('.slideshow-button').fadeIn(4600);

  $('#start').click(function() {
    $("#user-camera-photos").removeClass('whiteout');
    $("#user-camera-photos > img").removeClass('whiteout');
    $("#user-camera-photos > img").addClass('display-show');
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
