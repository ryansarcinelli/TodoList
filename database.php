<?php

$bd_server = "localhost";
$bd_user = "root";
$bd_pass = "";
$bd_name = "listatarefas";

$conn = mysqli_connect($bd_server, $bd_user, $bd_pass, $bd_name);

if (!$conn) {
    die("Erro ao conectar ao banco de dados: " . mysqli_connect_error());
}
