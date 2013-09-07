<?php
$url=parse_url(getenv("CLEARDB_DATABASE_URL"));
$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"],1);

$connection = mysql_connect($server, $username, $password);
mysql_select_db($db);

$sql = "INSERT INTO rvrb_users (id) VALUES (11111111)";
if (!mysql_query($sql)) {
	echo ('everything is terrible');
}
