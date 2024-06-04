<?php
$servername = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbname = "loginDB";

$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = $conn->prepare("INSERT INTO logins (username, password) VALUES (?, ?)");
$sql->bind_param("ss", $username, $password);

if ($sql->execute()) {
    echo "Login registrado com sucesso!";
} else {
    echo "Erro ao registrar login: " . $sql->error;
}

$sql->close();
$conn->close();
?>
