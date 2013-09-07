<?php
require_once 'php-soundcloud/Services/Soundcloud.php';

$type = $_GET['type'];
$code = $_GET['code'];
$client = new Services_Soundcloud('3986a172489d4744894147b7516b964b',
                                  '1609b9b8e5d6083c77e372ba9d235fb0',
                                  'http://rvrb.herokuapp.com/aman_test/test4.php');
$homepage = 'Location: http://rvrb.herokuapp.com/index.html';


if (isset($type)) {
  if ($type == 'sc') {
    $url = $client->getAuthorizeUrl();
    header("Location: " . $url);
  } elseif ($type == 'fb') {
    header($homepage);
  } else {
    header($homepage);
  }
} elseif (isset($code)) {
  $token_info = $client->accessToken($code);
  $user = json_decode($client->get('me'));
  $key = 'id';
  $id = $user->$key;
  echo $id;
} else {
  header($homepage);
}

?>
<!DOCTYPE html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if IE 8]>
<html class="no-js lt-ie9" lang="en">
<![endif]-->
  <!--[if gt IE 8]><!-->
  <html class="no-js" lang="en">
    <!--<![endif]-->
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>Rvrb</title>
    </head>
    <body>
      <script src="recorder.js"></script>
	<script>
		//for backward compatibility
		window.AudioContext = window.AudioContext || window.webkitAudioContext;

		//this is like a canvas for audio
		var context = new AudioContext();

		//object for web audio source
		var source = context.createBufferSource();



		//load file
		var request = new XMLHttpRequest();
		var url = "../daniel/atmosphere.mp3";
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';

		//decode async
		request.onload = function() {
			context.decodeAudioData(request.response, function(buffer) {
				//set buffer to 
				source.buffer = buffer;
				source.connect(context.destination);

				var filter = context.createBiquadFilter();
				// Create the audio graph.
				source.connect(filter);
				filter.connect(context.destination);
				// Create and specify parameters for the low-pass filter.
				filter.type = 0; // Low-pass filter. See BiquadFilterNode docs
				filter.frequency.value = 4400; // Set cutoff to 440 HZ
			})
		}
		request.send();

		//play onclick
		function playSong()
		{
			source.start(0);
		}

		//backwards compatibility for recording
		if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        //toggle record button
        var recording = false;
		function toggleRecord()
		{
			if (!recording) {
				//request permissions from browser for recording
        		navigator.getUserMedia({audio:true}, record, function(e) {
            		alert('Error getting audio');
            	console.log(e);
        });
			} else {
				stopRecord();
			}
			recording = !recording;
		}

		//store audio input
		var inputPoint;
		var audioRecorder;
		var inputBuffer;
		function record(stream) {
			//get input from stream
			inputPoint = context.createMediaStreamSource(stream);
			audioRecorder = new Recorder(inputPoint);
			audioRecorder.record();
		}

		function stopRecord() {
			audioRecorder.stop();
			//copy temporary buffer to buffer
			audioRecorder.getBuffer(function(buffer){
				inputBuffer = buffer[0];
			});
		}

		function playback() {
			var newSource = context.createBufferSource();
    		var newBuffer = context.createBuffer( 1, inputBuffer.length, context.sampleRate );
		    newBuffer.getChannelData(0).set(inputBuffer);
		    newSource.buffer = newBuffer;

		    newSource.connect( context.destination );
		    newSource.start(0);
		}

		</script>
      <button onclick="playSong()">Play Song</button>
      <button onclick="startRecord()">Start Record</button>
      <button onclick="stopRecord()">Stop Record</button>
    </body>
  </html>
