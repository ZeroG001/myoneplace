<?php
include("config.php");

if(isset($_POST['keyword'])) {
	$keyword = $_POST['keyword'];
} else die("Nothing was set in the post variable.");

try {

	//Here I want to make it so that you can search a partial name. I hoep PHP supports GREP
	//Which im sure it does.

$query = "SELECT firstName, lastName, photoURL FROM tbl_employees WHERE firstName LIKE ?";
$stmt = $db->prepare($query);
$stmt->bindValue(1,$keyword);
$stmt->execute();


} catch(exception $e) {
 echo "there was an error querying the database.";
}

$results_array = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($results_array as $item) {
	echo "<div class='searchResults'>";
	echo "<div class='resultFirstName'>" . $item["firstName"] . " " . $item["lastName"] . "<div class='resultImage'><img src='http://" . $item["photoURL"] . "'></div> </div>";
	echo "</div>";
}

?>