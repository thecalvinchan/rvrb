<?php
// require_once 'php-soundcloud/Services/Soundcloud.php';

// create client object with app credentials
// $client = new Services_Soundcloud(
//    'd42ba4a95dc468d30b8683e9956e430e', '057c884f3b17bfb0ceaddad026cde32b', 'http://localhost/test2.php');

// $authorizeUrl = $client->getAuthorizeUrl();

?>
<html>
    <body>
        <h1>TEST.PHP</h1>
        <a href="<?php echo $authorizeUrl; ?>">Connect with SoundCloud</a>
    </body>
</html>

