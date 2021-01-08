<?php
include '../config/config.php';

$con = mysqli_connect($host, $user, $password, $database);
mysqli_set_charset( $con, 'utf8');

$sql = "select * from ".$dbPlannedGames;

$result = mysqli_query($con,$sql);

//Fetch into associative array
while ( $row = $result->fetch_assoc())  {
  $dbdata[]=$row;
}

//Print array in JSON format
echo json_encode($dbdata);

$con->close();
?>