var NavRouter = Backbone.Router.extend({
  initialize: function() {
    console.log('nav router');
    this.navView = new NavView({ el: $(".secondary-nav") });
  }
});
