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
      <!-- Set the viewport width to device width for mobile -->
      <meta name="viewport" content="width=device-width" />
      <title>Rvrb</title>
      <!-- Included CSS Files (Compressed) -->
      <link rel="stylesheet" href="style.css" />
      <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="img/favicon.ico" type="image/x-icon" />
    </head>
    <body>
      <script src="recorder.js"></script>
      <script>
      </script>
      <button onclick="playSong()">Play Song</button>
      <button onclick="toggleRecord()">Record</button>
      <button onclick="playback()">Playback</button>
    </body>
  </html>