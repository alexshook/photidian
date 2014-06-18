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
    var aboutTemplate = _.template($('<div class="about">The average laptop/destop owner spends five hours/day in front of a computer screen. Photidian is a visual diary of those hours- take a photo with your webcam every day and document your life in front of the computer. You can view your photos by date or in a slideshow for a time-lapse effect.</div>'));
    $('.secondary-nav').append(aboutTemplate);


  }

});
