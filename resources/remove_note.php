
<?php
require("config.php");

try {
	//Replace the number with a note ID from the main page.
	if($_SERVER['REQUEST_METHOD'] == "POST") {
		$noteid = $_POST['id'];
	} else {
		"The program was unable to retrieve the note ID! Or you aren't using post";
		exit();
	}

	$query = "DELETE FROM tbl_notes WHERE note_id = ?";
	$stmt = $db->prepare($query);
	$stmt->bindValue(1, $noteid);
	$results = $stmt->execute();
	echo "success query compleyte";
} catch (exception $e) {
	echo "there was a problem querying the database";
}

$db = null;

?>