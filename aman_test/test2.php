<?php
require_once 'php-soundcloud/Services/Soundcloud.php';

// create client object with app credentials
$client = new Services_Soundcloud(
    'd42ba4a95dc468d30b8683e9956e430e', '057c884f3b17bfb0ceaddad026cde32b',
    'http://rvrb.herokuapp.com/aman_test/test2.php');

$token_arr = $client->accessToken($_GET['code']);
$access = $token_arr["access_token"];
$refresh = $token_arr["refresh_token"];

$track_data = array(
  'track[title]' => 'super appropriate song',
  'track[asset_data]' => '@/app/www/aman_test/super_appropriate_song.mp3'
);

$track_json = $client->post('tracks', $track_data);
$track = json_decode($track_json);
var_dump($track);

?>
<html>
    <body>
        <h1>TEST2.PHP</h1>
        <?php foreach ($a as $k => $v) {
          echo "\$a[$k] => $v.\n";
        } ?>
        <p><?php echo $token_arr; ?></p>
        <p><?php echo $access; ?></p>
        <p><?php echo $refresh; ?></p>
    </body>
</html>

