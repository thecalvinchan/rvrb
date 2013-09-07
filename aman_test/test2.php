<?php
require_once 'php-soundcloud/Services/Soundcloud.php';

// create client object with app credentials
$client = new Services_Soundcloud(
    'd42ba4a95dc468d30b8683e9956e430e', '057c884f3b17bfb0ceaddad026cde32b',
    'http://rvrb.herokuapp.com/aman_test/test2.php');

$token_arr = $client->accessToken($_GET['code']);
$access = $token_arr["access_token"];
var_dump($token_arr);
var_dump($access);
var_dump($token_arr["refresh_token"]);

$track_data = array(
  'track[title]' => 'super appropriate song',
  'track[asset_data]' => 'super_appropriate_song.mp3'
);

var_dump($track_data);

$track = json_decode($client->post('tracks', $track_data));

$a = 5;

var_dump($track);

try {
    $response = $client->post('tracks', $track);
    var_dump($response);
} catch (Services_Soundcloud_Invalid_Http_Response_Code_Exception $e) {
    echo $e->getMessage();
}

?>
<html>
    <body>
        <h1>TEST2.PHP</h1>
    </body>
</html>

