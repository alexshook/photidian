var NavView = Backbone.View.extend ({
  el: 'div.secondary-nav',

  initialize: function() {
    console.log('initialize NavView');
  },

  events: {
    'click a#search-users': 'displaySearchForm',
    'click a#about': 'displayAbout',
  },

  displaySearchForm: function(e) {
    e.preventDefault();
    console.log('hey im displaySearchForm');
    $('#search-form-wrapper').toggleClass();
  },

  displayAbout: function(e) {
    e.preventDefault();
    console.log('hey im displayAbout');
    var aboutTemplate = _.template($("#about-template").html());
    $('.secondary-nav').append('<div id="about-template-wrapper"></div>');
    $('#about-template-wrapper').html(aboutTemplate);
  }

});
