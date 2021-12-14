<?php
// include('db.php');

// $SQL = "SELECT * FROM categories";
// $exeSQL = mysqli_query($conn, $SQL);
// $checkRows =  mysqli_num_rows($exeSQL);

// if ($checkRows > 0) {
//     while($row[] = $exeSQL->fetch_assoc()) {
 
//         $item = $row;
        
//         $response = json_encode($item);}
// } else {
//     $Message = "No record";
// }
// // $response[] = array("Message" => $Message);
// echo json_encode($response);
$servername = "localhost";
$username = "goupgade_bestbuy";
$password = "wG3-0L;CTcdE";
$dbname = "goupgade_bestbuy_space";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

 
if ($conn->connect_error) {
 
 die("Connection failed: " . $conn->connect_error);
} 
 
// Creating SQL command to fetch all records from Table.
$sql = "SELECT * FROM categories ORDER BY id DESC LIMIT 12";
 
$result = $conn->query($sql);
 
if ($result->num_rows >0) {
 
 
 while($row[] = $result->fetch_assoc()) {
 
 $item = $row;
 
 $json = json_encode($item);
 
 }
 
} else {
 echo "No Results Found.";
}
 echo $json;
$conn->close();
?>