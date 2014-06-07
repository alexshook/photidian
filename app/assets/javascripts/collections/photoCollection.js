var PhotoCollection = Backbone.Collection.extend({
  url: '/photos',
  model: Photo
});

var collection = new PhotoCollection();
