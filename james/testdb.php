<?php
$url=parse_url(getenv("CLEARDB_DATABASE_URL"));
$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"],1);

$connection = mysql_connect($server, $username, $password);
mysql_select_db($db);

$q = mysql_query('DESCRIBE rvrb_users');
while($row = mysql_fetch_array($q)) {
    echo "{$row['Field']} - {$row['Type']}\n";
}

$sql = "INSERT INTO rvrb_users (id) VALUES (11111111)";
if (!mysql_query($connection, $sql)) {
	echo ('everything is terrible');
}