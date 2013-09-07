<?php
require_once 'php-soundcloud/Services/Soundcloud.php';

$type = $_GET['type'];

if ($type == 'sc') {
  $client = new Services_Soundcloud(
      'd42ba4a95dc468d30b8683e9956e430e', '057c884f3b17bfb0ceaddad026cde32b',
      'http://rvrb.herokuapp.com/fb.php');

  header("Location: " . $client->getAuthorizeUrl());
} elseif ($type == 'fb') {
  header('Location: http://rvrb.herokuapp.com/index.html');
} else {
  var_dump($type);
//  header('Location: http://rvrb.herokuapp.com/index.html');
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
    </body>
  </html>
