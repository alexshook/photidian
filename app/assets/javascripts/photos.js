(function() {
  window.addEventListener('DOMContentLoaded', function() {
    var isStreaming = false,
      videoElement = document.getElementById('vid'),
      canvas = document.getElementById('can'),
      width = 600,
      height = 420,
      videoStream = { video: true, audio: false },
      photo = document.getElementById('photo'),
      photoButton = document.getElementById('take-photo'),
      startButton = document.getElementById('start');

    startButton.addEventListener('click', function() {
      // Cross browser compatibility with one variable
      navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

      if (navigator.getUserMedia) {
        navigator.getUserMedia(videoStream, function(stream) {
            // Cross browser checks
            var url = window.URL || window.webkitURL;
              videoElement.src = url ? url.createObjectURL(stream) : stream;
              // Set the video to play
              videoElement.play();
          },
          function(error) {
            alert('Sorry, the browser you are using doesn\'t support getUserMedia');
            // return;
        });
      }
    });

    photoButton.addEventListener('click', function() {
      canvas.getContext('2d').drawImage(videoElement, 0, 0, width, height);
      videoElement.setAttribute('width', width);
      videoElement.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      var data = canvas.toDataURL('image/jpeg');
      photo.setAttribute('src', data);
    });


    // Wait until the video stream can play
    videoElement.addEventListener('canplay', function(e) {
        if (!isStreaming) {
          // videoWidth isn't always set correctly in all browsers
          if (videoElement.videoWidth > 0) height = videoElement.videoHeight / (videoElement.videoWidth / width);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        videoElement.setAttribute('width', width);
        videoElement.setAttribute('height', height);
        // Reverse the canvas image
        canvas.getContext('2d').translate(width, 0);
        canvas.getContext('2d').scale(-1, 1);
        isStreaming = true;
        }
    }, false);

    // Wait for the video to start to play
    videoElement.addEventListener('play', function() {
      // Every 33 milliseconds copy the video image to the canvas
      setInterval(function() {
        if (videoElement.paused || videoElement.ended) return;
        canvas.getContext('2d').fillRect(0, 0, width, height);
        canvas.getContext('2d').drawImage(videoElement, 0, 0, width, height);
      }, 33);
    }, false);

    // function takePhoto() {
      // canvas.drawImage(videoElement, 0, 0, width, height);
      // videoElement.setAttribute('width', width);
      // videoElement.setAttribute('height', height);
      // canvas.setAttribute('width', width);
      // canvas.setAttribute('height', height);
      // var data = canvas.toDataURL('image/jpeg');
      // photo.setAttribute('src', data);
    // }

    // photo.addEventListener('click', takePhoto);

    // photoButton.addEventListener('click', function(e){
    //   takePhoto();
    //   e.preventDefault();
    // }, false);
  })
})();
