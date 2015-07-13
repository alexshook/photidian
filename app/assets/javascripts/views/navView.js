var NavView = Backbone.View.extend ({

  initialize: function() {
    console.log('initialize NavView');
  },

  events: {
    'click a#about': 'displayAbout',
    'click a#sign-up-link': 'displaySignUp',
    'click a#sign-in-link': 'displaySignIn'
  },

  displayAbout: function(e) {
    e.preventDefault();
    var aboutTemplate = _.template($("#about-template").html());
    $('#index').empty();
    $('#index').addClass('pure-u-5-5');
    $('#index').append('<div id="about-template-wrapper"></div>');
    $('#about-template-wrapper').html(aboutTemplate);
  },

  displaySignUp: function(e) {
    e.preventDefault();
    var signUpTemplate = _.template($("#sign-up-template").html());
    $('#index').empty();
    $('#index').append('<div id="sign-up-template-wrapper"></div>');
    $('#sign-up-template-wrapper').html(signUpTemplate);
  },

  displaySignIn: function(e) {
    e.preventDefault();
    var signInTemplate = _.template($("#sign-in-template").html());
    $('#index').empty();
    $('#index').append('<div id="sign-in-template-wrapper"></div>');
    $('#sign-in-template-wrapper').html(signInTemplate);
  }

});
