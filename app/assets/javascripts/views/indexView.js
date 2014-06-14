var IndexView = Backbone.View.extend({
  el: 'div#index',

  initialize: function() {
    this.isStreaming = false;
    this.videoElement = document.getElementById('vid');
    this.canvas = document.getElementById('can');
    this.width = 500;
    this.height = 375;
    this.videoStream = { video: true, audio: false };
    this.data;
    this.photo = document.getElementById('photo');
    $('.about-photidian').hide();
  },

  events: {
    'click button#get-started': 'displayButtons',
    'click button#take-photo': 'takePhoto',
    'click button#upload-button': 'uploadPhoto',
    'click a#demo': 'showPopover'
  },

  displayButtons: function() {
    console.log('im display buttons');
    var buttonsTemplate = _.template($('#buttons-template').html());
    this.$el.html(buttonsTemplate);
    this.getStream();
    $('#allow-access').fadeTo(4600, 0);
  },

  getStream: function() {
    console.log('im getStream')
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
      navigator.getUserMedia(this.videoStream, function(stream) {
        // Cross browser checks
        var url = window.URL || window.webkitURL;
        this.videoElement.src = url ? url.createObjectURL(stream) : stream;
        this.videoElement.play();
        console.log(this);
      }.bind(this),

        function(error) {
          alert('Sorry, the browser you are using doesn\'t support getUserMedia');
      });
    }
  },

  takePhoto: function() {
    console.log('hey im takePhoto');
    this.videoElement.setAttribute('width', this.width);
    this.videoElement.setAttribute('height', this.height);
    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
    this.canvas.getContext('2d').drawImage(this.videoElement, 0, 0, this.width, this.height);
    // encode the image
    var data = this.canvas.toDataURL('image/jpeg');
    // set the image source to be the value of the encoded data variable
    var photo = this.photo.setAttribute('src', data);
  },

  uploadPhoto: function() {
    console.log('hey im uploadPhoto');
    if ((this.photo.src == 'http://0.0.0.0:3000/') || (this.photo.src == 'http://photidian.herokuapp.com/')) {
      var errorHandlerTemplate = _.template($('#error-handler').html());
      this.$el.html(errorHandlerTemplate);
    } else {
      $.ajax({
      url: '/photos',
      method: 'post',
      dataType: 'json',
      data: { file: photo.src }
      }).done(function() {
        $.get('/photos');
      }).done(function() {
        $('#s3-save').modal('show');
      });
    }
  },

  showPopover: function() {
    $('#demo').popover('show');
  }
});
