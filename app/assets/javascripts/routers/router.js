var PhotoRouter = Backbone.Router.extend({
  initialize: function() {
    console.log('router');
    this.indexView = new IndexView({ el: $("#index") });
    this.navView = new NavView({ el: $(".secondary-nav") });
    this.photo = new Photo();
  },
  routes: {
    '': '',
  },
  index: function() {
    console.log('index bro');
  }
})
