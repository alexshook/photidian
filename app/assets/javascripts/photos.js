$().ready(function() {
  $("#user-camera-photos > div").hide();
  $("#user-camera-photos > div:first").show();

  $('#start').click(function() {
    $("#user-camera-photos > div:first").fadeOut(250);
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
