window.onload = function(){
  // var v = document.getElementById('v');
  // var videoStream = '';
  // navigator.getUserMedia = (navigator.getUserMedia ||
  //                           navigator.webkitGetUserMedia ||
  //                           navigator.mozGetUserMedia ||
  //                           navigator.msGetUserMedia);
  // function gotSources(sourceInfos) {
  //   videoStream = sourceInfos[0];
  // }
  //
  // if (typeof MediaStreamTrack === 'undefined'){
  //   alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
  // } else {
  //   MediaStreamTrack.getSources(gotSources);
  // }
  // if (navigator.getUserMedia) {
  //    // Request access to video only
  //    navigator.getUserMedia(
  //       {
  //          video:{
  //            optional : [{sourceId : videoStream}]
  //          },
  //          audio:false
  //       },
  //       function(stream) {
  //          var url = window.URL || window.webkitURL;
  //          v.src = url ? url.createObjectURL(stream) : stream;
  //          v.play();
  //         // startTracking();
  //       },
  //       function(error) {
  //          alert('Something went wrong. (error code ' + error.code + ')');
  //          return;
  //       }
  //    );
  // }
  // else {
  //    alert('Sorry, the browser you are using doesn\'t support getUserMedia');
  //    return;
  // }
  'use strict';

var videoElement = document.querySelector('video');
var videoSelect = document.querySelector('select#videoSource');

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function gotSources(sourceInfos) {
  for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    var option = document.createElement('option');
    option.value = sourceInfo.id;
    if (sourceInfo.kind === 'video') {
      option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source: ', sourceInfo);
    }
  }
}

if (typeof MediaStreamTrack === 'undefined'){
  alert('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
} else {
  MediaStreamTrack.getSources(gotSources);
}


function successCallback(stream) {
  window.stream = stream; // make stream available to console
  videoElement.src = window.URL.createObjectURL(stream);
  videoElement.play();
}

function errorCallback(error){
  console.log('navigator.getUserMedia error: ', error);
}

function start(){
  if (!!window.stream) {
    videoElement.src = null;
    window.stream.stop();
  }
  var videoSource = videoSelect.value;
  var constraints = {
    audio :  false,
    video: {
      optional: [{sourceId: videoSource}]
    }
  };
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

videoSelect.onchange = start;

start();
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
