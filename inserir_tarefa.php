<?php
include("database.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = mysqli_real_escape_string($conn, $_POST['nome']);
    $custo = mysqli_real_escape_string($conn, $_POST['custo']);
    $data = mysqli_real_escape_string($conn, $_POST['data']);

    $ordemQuery = "SELECT MAX(ordem_apresentacao) AS max_ordem FROM tarefas";
    $ordemResult = mysqli_query($conn, $ordemQuery);
    $ordem = ($ordemResult && $row = mysqli_fetch_assoc($ordemResult)) ? $row['max_ordem'] + 1 : 1;

    $sql = "INSERT INTO tarefas (nome_tarefa, custo, data_limite, ordem_apresentacao)
            VALUES ('$nome', '$custo', '$data', '$ordem')";

    try {
        if (mysqli_query($conn, $sql)) {
            echo "<script>alert('Tarefa adicionada com sucesso!');</script>";
            echo "<script>window.location.href = 'index.php';</script>";
        } else {
            echo "<script>alert('Erro ao adicionar tarefa: " . mysqli_error($conn) . "');</script>";
            echo "<script>window.location.href = 'index.php';</script>";
        }
    } catch (Exception $e) {
        echo "<script>alert('Erro: " . $e->getMessage() . "');</script>";
        echo "<script>window.location.href = 'index.php';</script>";
    }

    mysqli_close($conn);
} else {
    echo "<script>alert('Método inválido.');</script>";
    echo "<script>window.location.href = 'index.php';</script>";
}
