<?php
// Get note.php will serve these functions:
// - Retreives all notes stored in database
// - Stores each value into an array
// - The html is generated by PHP and possably uses javascript to append to the main body

//For now I will make it so that if there is a failure. The information will not show


require("config.php");


try {
	$query = "SELECT * FROM tbl_notes";
	$stmt = $db->prepare($query);
	$results = $stmt->execute();

} catch (exception $e) {
	echo "There was a problem connecting to the database";
	var_dump($e);
	exit;

}

$results_array = $stmt->fetchAll(PDO::FETCH_ASSOC);	
$results_array = array_reverse($results_array);

foreach ($results_array as $value) {


echo "<div id='". $value['note_id'] . "' class='item note-container'>";
echo "<div class='note-wrapper' style='background-color:".$value['note_color']."'>";
echo "<div class='note-title'>".htmlentities($value['title'])."</div>";
echo "<div class='note-detail'>".htmlentities($value['details'])."</div>";
echo "<div class='note-options'> Color | <button class='edit-note-modal btn btn-default btn-xs' data-toggle='modal' data-target='#myModal'>Edit</button>  |";
echo "<button class='btn btn-default btn-xs delete-note'> Delete </button> </div>";
echo "</div>";
echo "</div>";		
}
?>