$().ready(function() {
  console.log('loaded bro');
  var photoAppRouter = new PhotoRouter();
  Backbone.history.start();
});
