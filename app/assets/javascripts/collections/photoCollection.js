var PhotoCollection = Backbone.Collection.extend({
  url: '/photos',
  model: PhotoModel
});
