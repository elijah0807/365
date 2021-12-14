<?php
include('db.php');

// $email = $decodedData['email'];
$username = $decodedData['username'];
$password = ($decodedData['password']); //password is hashed

$SQL = "SELECT * FROM users WHERE username = '$username'";
$exeSQL = mysqli_query($conn, $SQL);
$checkUsername =  mysqli_num_rows($exeSQL);

if ($checkUsername != 0) {
    $array_user = mysqli_fetch_array($exeSQL);
    if (password_verify($password, $array_user['password']) ) {
        $Message = "Success";
    } else {
        $Message = "Password Incorrect";
    }
} else {
    $Message = "username doesn't exit";
}

$response[] = array("Message" => $Message);
echo json_encode($response);
?>