<?php
include('db.php');

$email = $decodedData['email'];
$username = $decodedData['username'];
$password = password_hash($decodedData['password'],PASSWORD_DEFAULT); //password is hashed
$firstname = $decodedData['firstname'];
$lastname = $decodedData['lastname'];
$phone = $decodedData['phone'];
$mobile = $decodedData['mobile'];
$staff_name = $decodedData['staff_name'];
$staff_id = $decodedData['staff_id'];
$tax_id = $decodedData['tax_id'];
$policy_check = $decodedData['policy_check'];
$ref_by = $decodedData['ref_by'];
$balance = $decodedData['balance'];
$address = $decodedData['address'];
$status = $decodedData['status'];
$ev = $decodedData['ev'];
$sv = $decodedData['sv'];
$ver_code = $decodedData['ver_code'];
$created_at = $decodedData['created_at'];


$SQL = "SELECT * FROM users WHERE email = '$email' OR username = '$username'";
$exeSQL = mysqli_query($conn, $SQL);
$check =  mysqli_num_rows($exeSQL);

if ($check != 0) {
    $row = mysqli_fetch_assoc($exeSQL);
    
    if($username == $row['username']){
        $Message = "Username already exists";
    } elseif($email == $row['email']){
        $Message = "Email already exists";
    }else{
        return;
    }
    
} else {

    $InsertQuerry = "INSERT INTO users(firstname,lastname,email,password,username,phone,mobile,staff_name,staff_id,tax_id,policy_check,ref_by,balance,address,status,ev,sv,ver_code,created_at) VALUES ('$firstname','$lastname','$email','$password','$username','$phone','$mobile','$staff_name','$staff_id','$tax_id','$policy_check','$ref_by','$balance','$address','$status','$ev','$sv','$ver_code','$created_at')";
    $R = mysqli_query($conn, $InsertQuerry);

    if ($R) {
        $Message = "success";
    } else {
        $Message = "An error occur";
    }
}
$response[] = array("Message" => $Message);

echo json_encode($response);
?>