<?php
$conn = mysqli_connect('localhost', 'goupgade_bestbuy', 'wG3-0L;CTcdE');
$database = mysqli_select_db($conn, 'goupgade_bestbuy_space');

$encodedData = file_get_contents('php://input');  // take data from react native fetch API
$decodedData = json_decode($encodedData, true);
?>