var SearchView = Backbone.View.extend ({
  el: 'div#index',

  initialize: function() {
    console.log('im initialize SearchView');
  },

  events: {
    'click button#search-users': 'displaySearchForm'
  },

  displaySearchForm: function() {
    console.log('hey im displaySearchForm');
    var searchFormTemplate = _.template($('#search-template').html());
    this.$el.html(searchFormTemplate);
  }

});
