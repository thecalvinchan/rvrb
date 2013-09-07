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

$track = json_decode($client->post('tracks', $track_data));

?>
<html>
    <body>
        <h1>TEST2.PHP</h1>
        <h2>token_arr</h2>
        <table>
            <?php foreach($token_arr as $key=>$value): ?>
            <tr>
                <td><?php echo $key; ?></td>
                <td><?php echo $value; ?></td>
            </tr>
            <?php endforeach; ?>
        </table>
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

