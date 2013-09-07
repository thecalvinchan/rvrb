<?php
require_once 'php-soundcloud/Services/Soundcloud.php';

// create client object with app credentials
$client = new Services_Soundcloud('3986a172489d4744894147b7516b964b',
                                  '1609b9b8e5d6083c77e372ba9d235fb0',
                                  'http://rvrb.herokuapp.com/aman_test/test4.php');

$authorizeUrl = $client->getAuthorizeUrl();

?>
<html>
    <body>
        <h1>TEST.PHP</h1>
        <a href="<?php echo $authorizeUrl; ?>">Connect with SoundCloud</a>
    </body>
</html>

