var PhotoRouter = Backbone.Router.extend({
  initialize: function() {
    console.log('router');
    this.streamingView = new StreamingView({ el: $("#index") });
    this.navView = new NavView({ el: $(".secondary-nav") });
    this.photoModel = new PhotoModel();
    this.userModel = new UserModel();
    this.userCollection = new UserCollection({model: this.userModel});
    this.userList = new UserList({collection: this.userCollection});
  },
  routes: {
    'user': 'index',
    'users/:id': 'showUser'
  },
  index: function() {
    console.log('index router');
    this.userCollection.fetch({reset: true, wait: true});
  },
  showUser: function(id) {
    this.userCollection.fetch({success: function() {
      this.userList.filter(id);
    }.bind(this)})
  }
});
