
<?php
require("config.php");

try {
	//Replace the number with a note ID from the main page.
	$number = 30;
	$query = "DELETE FROM tbl_notes WHERE note_id = ?";
dd
	$stmt = $db->prepare($query);
	$stmt->bindValue(1, $number);
	$results = $stmt->execute();
	echo "success query compleyte";
} catch (exception $e) {
	echo "there was a problem querying the database";
}

?>