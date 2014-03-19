<?php
try {
	$db = new PDO("mysql:host=localhost; dbname=one", "root", "sonic001");
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //Turns on error reporting and catches the exception
	$db->exec("SET NAMES 'utf8'");
	echo "<h1> Success </h1>";
} catch (exception $e) {	
	echo "There was a problem connecting to the database";
}



if($_SERVER['REQUEST_METHOD'] == "POST") {
	$name = $_POST['name'];
	
}

echo "<h1> Hello " . $name . " </h1>";

?>