<?php
//Edit_note.php This page is called when the user saves the note from the modal

include("config.php");

if($_SERVER['REQUEST_METHOD'] == "POST") {
	$note_id = $_POST['note_id'];
	$detail = $_POST['detail'];
	$title = $_POST['title'];
} else {
	exit;
}


try {
	$query = "UPDATE tbl_notes SET title = ?, details = ? WHERE note_id = ?";
	$stmt = $db->prepare($query);
	$stmt->bindValue(1, $title);
	$stmt->bindValue(2, $detail);
	$stmt->bindValue(3, $note_id);
	$results = $stmt->execute();

} catch (exception $e) {
	echo "There was a problem connecting to the database";
	exit;

}

?>