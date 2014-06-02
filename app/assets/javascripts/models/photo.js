var Photo = Backbone.Model.extend({
  urlRoot: '/photos',
  defaults: {
    img_url: 'http://placekitten.com/300/300'
  },
  initialize: function(){
    console.log('im the photo model')
  }
});
