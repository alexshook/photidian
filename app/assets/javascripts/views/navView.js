var NavView = Backbone.View.extend ({

  initialize: function() {
    console.log('initialize NavView');
    this.modal = {};
    this.overlay = $('#overlay');
    this.signInModal = $('#sign-in-modal');
    this.signUpModal = $('#sign-up-modal');
    this.content = $('#content');
    this.close = $('#close');
  },

  events: {
    'click a#about': 'displayAbout',
    'click a#sign-up-link': 'displaySignUpModal',
    'click a#sign-in-link': 'displaySignInModal'
  },

  displayAbout: function(e) {
    e.preventDefault();
    console.log('hey im displayAbout');
    var aboutTemplate = _.template($("#about-template").html());
    $('#index').empty();
    $('#index').append('<div id="about-template-wrapper"></div>');
    $('#about-template-wrapper').html(aboutTemplate);
  },

  displaySignUpModal: function(e, settings) {
    e.preventDefault();
    console.log('sign up modal!');
    this.signUpModal.removeClass('hide');
    this.overlay.removeClass('hide');
  },

  displaySignInModal: function(e) {
    e.preventDefault();
    console.log('sign in modal!');
  }

});
