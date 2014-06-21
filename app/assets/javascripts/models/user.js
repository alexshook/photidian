var UserModel = Backbone.Model.extend({
  url: '/users',
  initialize: function() {
    console.log('user model!');
  }
});
