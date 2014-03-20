<?php
try {
	$db = new PDO("mysql:host=localhost; dbname=one", "root", "sonic001");
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //Turns on error reporting and catches the exception
	$db->exec("SET NAMES 'utf8'");
	
} catch (exception $e) {	
	echo "There was a problem connecting to the database";
}

if($_SERVER['REQUEST_METHOD'] == "POST") {
	$detail = $_POST['detail'];
	$title = $_POST['title'];
} else {
	echo "<h1> Was not able to load variables </h1>";
	exit;
}

try {
	$query = "INSERT INTO tbl_notes (details,title) VALUES (?,?)";
	$result = $db->prepare($query);
	$result->bindValue(1,$detail);
	$result->bindValue(2,$title);
	$result->execute();

	echo "<h3 class='status'> You have successfully sent query the database </h3>";

} catch (exception $e) {
	echo "there was a problem querying the database. Perhaps your query isn't correct or there was a syntax error";
}

$db = null;


?>