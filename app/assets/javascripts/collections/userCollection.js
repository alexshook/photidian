var UserCollection = Backbone.Collection.extend({
  url: '/users',
  model: UserModel
});
