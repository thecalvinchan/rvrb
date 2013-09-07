<?php
require_once 'php-soundcloud/Services/Soundcloud.php';

// create client object with app credentials
$client = new Services_Soundcloud(
    'd42ba4a95dc468d30b8683e9956e430e', '057c884f3b17bfb0ceaddad026cde32b',
    'http://rvrb.herokuapp.com/aman_test/test2.php');

// var_dump(get_class_methods($client));
// $code = $_GET['code'];
// $accessToken = $client->accessToken($code);
// var_dump($accessToken);

try {
      $accessToken = $client->accessToken($_GET['code']);
      var_dump($accessToken);
} catch (Services_Soundcloud_Invalid_Http_Response_Code_Exception $e) {
      echo 'b';
      echo $e->getMessage();
}

?>
<html>
    <body>
        <h1>TEST2.PHP</h1>
    </body>
</html>

