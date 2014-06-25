var NavRouter = Backbone.Router.extend({
  initialize: function() {
    this.navView = new NavView({ el: $(".secondary-nav") });
  }
});
