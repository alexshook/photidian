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
    this.allowed = false;
  },

  events: {
    'click button#get-started': 'displayButtons',
    'click button#take-photo': 'takePhoto',
    'click button#upload-button': 'uploadPhoto'
  },

  displayButtons: function() {
    console.log('im display buttons');
    var template = _.template($('#buttons-template').html());
    this.$el.html(template);
    this.getStream();
    $('#allow-access').fadeOut(4600);
  },

  getStream: function() {
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
      navigator.getUserMedia(this.videoStream, function(stream) {
        // Cross browser checks
        var url = window.URL || window.webkitURL;
        this.videoElement.src = url ? url.createObjectURL(stream) : stream;
        this.videoElement.play();
        this.allowed = true;
      }.bind(this),

        function(error) {
          alert('Sorry, the browser you are using doesn\'t support getUserMedia');
          this.allowed = false;
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
    photo.setAttribute('src', data);
  },

  uploadPhoto: function() {
    if ((photo.src == 'http://0.0.0.0:3000/') || (photo.src == 'http://photidian.herokuapp.com/')) {
      alert('You must take a photo first');
    } else {
      $.ajax({
      url: '/photos',
      method: 'post',
      dataType: 'json',
      data: { file: photo.src }
      }).done(function() {
        $('#s3-save').modal('show');
      });
    }
  }
});
