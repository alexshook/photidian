var NavView = Backbone.View.extend ({
  el: 'div.secondary-nav',

  initialize: function() {
    console.log('im initialize SearchView');
  },

  events: {
    'click a#search-users': 'displaySearchForm',
    'click a#about': 'displayAbout'
  },

  displaySearchForm: function(e) {
    e.preventDefault();
    console.log('hey im displaySearchForm');
    var searchFormTemplate = _.template($("#search-template").html());
    $('.secondary-nav').append($('<div id="search-form-wrapper"></div>'));
    $('#search-form-wrapper').html(searchFormTemplate).slideDown('slow');
  },

  displayAbout: function(e) {
    e.preventDefault();
    console.log('hey im displayAbout');
  }

});
