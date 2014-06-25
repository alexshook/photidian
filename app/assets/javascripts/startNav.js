$().ready(function() {
  console.log('loaded bro');
  var navRouter = new NavRouter();
  Backbone.history.start();
});
