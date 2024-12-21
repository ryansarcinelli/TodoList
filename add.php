<?php
    include("database.php"); // Arquivo com a conexão ao banco de dados

    $nome = "get good";
    $custo ="1200";
    $data = "2003-07-09";
    $ordem ="04";

    $sql = "INSERT INTO tarefas (nome_tarefa, custo, data_limite, ordem_apresentacao)
            VALUES ('$nome', '$custo', '$data', '$ordem')";

    try{
        mysqli_query($conn, $sql);
        echo"user registered";
    }
    catch(mysqli_sql_exception){
        echo"could not";
    }

    mysqli_close($conn);
?>
