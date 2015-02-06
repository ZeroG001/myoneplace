<?php
//DO NOT ECHO or PRINT anything. I would like the response text to only be a number.
//Down the line I will need to find out how to do this.




include("config.php");



if($_SERVER['REQUEST_METHOD'] == "POST") {
	$detail = $_POST['detail'];
	$title = $_POST['title'];
	$noteColor  = $_POST['color'];
} else {
	exit;
}

try {
	$query = "INSERT INTO tbl_notes (details,title, note_color) VALUES (?,?,?)";
	$result = $db->prepare($query);
	$result->bindValue(1,$detail);
	$result->bindValue(2,$title);
	$result->bindValue(3,$noteColor);
	$result->execute();

	//This should be the only things thats echoed!
	//lastInsertId - This returns the note_id of the laster thing inserted
	echo $db->lastInsertId();

} catch (exception $e) {
	echo "There was a problem connecting to the database. The note will not be added.";
	exit;
}

$db = null;

?>