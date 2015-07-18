window.onload = function(){
  var v = document.getElementById('v');
  var videoStream = '';
  navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia);
  function gotSources(sourceInfos) {
    videoStream = sourceInfos[1];
  }

  if (typeof MediaStreamTrack === 'undefined'){
    alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
  } else {
    MediaStreamTrack.getSources(gotSources);
  }
  if (navigator.getUserMedia) {
     // Request access to video only
     navigator.getUserMedia(
        {
           video:{
             optional : [{sourceId : videoStream}]
           },
           audio:false
        },
        function(stream) {
           var url = window.URL || window.webkitURL;
           v.src = url ? url.createObjectURL(stream) : stream;
           v.play();
           startTracking();
        },
        function(error) {
           alert('Something went wrong. (error code ' + error.code + ')');
           return;
        }
     );
  }
  else {
     alert('Sorry, the browser you are using doesn\'t support getUserMedia');
     return;
  }
  function startTracking(){
    var colors = new tracking.ColorTracker(['cyan']);

        colors.on('track', function(event) {
          if (event.data.length === 0) {
            // No colors were detected in this frame.
          } else {
            event.data.forEach(function(rect) {
              console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
              // drawCube(rect.x, rect.y, 10);
            });
          }
        });

    tracking.track('#v', colors);
  }
}
