$().ready(function() {

  $("#user-camera-photos > div:gt(0)").hide();

  $('#start').click(function() {
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
