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
    var data;

    startButton.addEventListener('click', function() {
      // Cross browser compatibility with one variable
      navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

      if (navigator.getUserMedia) {
        navigator.getUserMedia(videoStream, function(stream) {
            // Cross browser checks
          var url = window.URL || window.webkitURL;
          videoElement.src = url ? url.createObjectURL(stream) : stream;
          videoElement.play();
        },

          function(error) {
            alert('Sorry, the browser you are using doesn\'t support getUserMedia');
            // return;
        });
      }
    }); // end startButton.addEventListener

    photoButton.addEventListener('click', function() {
      videoElement.setAttribute('width', width);
      videoElement.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      canvas.getContext('2d').drawImage(videoElement, 0, 0, width, height);
      // encode the image
      var data = canvas.toDataURL('image/jpeg');
      // set the image source to be the value of the encoded data variable
      photo.setAttribute('src', data);
    });

    var form = document.getElementById('upload-bro');
    form.addEventListener('click', function() {
      url: form.attr('action'),
      type: 'POST', //throws uncaught syntax error
      autoUpload: true,
      dataType: 'XML',
      add: function(event, data) {
        $.ajax({
          // should this hit photos or can it hit tests?
          url: '/photos',
          type: 'GET'
          dataType: 'JSON'
          data: { file: photo.src }
          async: false,
          success: function(data) {
            form.find('input[name=key']).val(data.key)
            form.find('input[name=policy]').va(data.policy)
            form.find('input[name=signature]').val(data.signature)
          }
        })
        data.submit();
      }
    });

  // $('.direct-upload').each(function() {

  //   var form = $(this)

  //   $(this).fileupload({
  //     url: form.attr('action'),
  //     type: 'POST',
  //     autoUpload: true,
  //     dataType: 'xml', // This is really important as s3 gives us back the url of the file in a XML document
  //     add: function (event, data) {
  //       $.ajax({
  //         url: "/signed_urls",
  //         type: 'GET',
  //         dataType: 'json',
  //         data: {doc: {title: data.files[0].name}}, // send the file name to the server so it can generate the key param
  //         async: false,
  //         success: function(data) {
  //           // Now that we have our data, we update the form so it contains all
  //           // the needed data to sign the request
  //           form.find('input[name=key]').val(data.key)
  //           form.find('input[name=policy]').val(data.policy)
  //           form.find('input[name=signature]').val(data.signature)
  //         }
  //       })
  //       data.submit();
  //     }
  //   })
  // })

    // document.getElementById('upload-button').addEventListener('click', function() {
    //   $.ajax({
    //     url: '/save_photo',
    //     method: 'post',
    //     dataType: 'json',
    //     data: { file: photo.src }
    //   });
    //   // savePhoto();
    //   console.log('you clicked the upload button!');
    // });

    // function savePhoto() {
    //   $.ajax({
    //     url: '/save_photo',
    //     method: 'post',
    //     dataType: 'json',
    //     data: {file: data},
    //   });
    //   console.log('im in savephoto!');
    // }

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
  })
})();
