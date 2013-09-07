<?php
require_once 'php-soundcloud/Services/Soundcloud.php';

// create client object with app credentials
$client = new Services_Soundcloud(
    'd42ba4a95dc468d30b8683e9956e430e', '057c884f3b17bfb0ceaddad026cde32b',
    'http://rvrb.herokuapp.com/aman_test/test2.php');

$token_arr = $client->accessToken($_GET['code']);

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
        <h2>token_arr</h2>
        <p>ACCESS TOKEN: <?php echo $token_arr["access_token"]; ?></p>
        <p>REFRESH TOKEN: <?php echo $token_arr["refresh_token"]; ?></p>
        <p>EXPIRES IN: <?php echo $token_arr["expires_in"]; ?></p>
        <p>SCOPE: <?php echo $token_arr["scope"]; ?></p>
        <h2>track</h2>
        <table>
            <?php foreach($track as $key=>$value): ?>
            <tr>
                <td><?php echo $key; ?></td>
                <td><?php echo $value; ?></td>
            </tr>
            <?php endforeach; ?>
        </table>
    </body>
</html>

