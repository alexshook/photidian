$("#user-camera-photos > div").hide();

$().ready(function() {

  $('#start').click(function() {
    $("#user-camera-photos").removeClass('whiteout');
    $("#user-camera-photos > div:first").show();
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
