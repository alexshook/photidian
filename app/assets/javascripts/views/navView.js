var NavView = Backbone.View.extend ({

  initialize: function() {
    console.log('initialize NavView');
  },

  events: {
    'click a#search-users': 'displaySearchForm',
    'click a#about': 'displayAbout'
  },

  displaySearchForm: function(e) {
    e.preventDefault();
    console.log('hey im displaySearchForm');
    $('#search-form-wrapper').toggleClass('hide');
  },

  displayAbout: function(e) {
    e.preventDefault();
    console.log('hey im displayAbout');
    var aboutTemplate = _.template($("#about-template").html());
    $('#index').empty();
    $('#index').append('<div id="about-template-wrapper"></div>');
    $('#about-template-wrapper').html(aboutTemplate);
  }

});
