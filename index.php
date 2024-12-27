<?php
    include("database.php");

?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lista de Tarefas</title>
    <button id="botaoNoturno" class="modo-botao">
        <img src="img/noturno.png" alt="Ícone do Modo Noturno">
    </button>
    <script type="text/javascript" src="jquery-3.3.1.js"></script>
    <script src ="script.js" defer></script>
</head>

<body>
    <h1>Lista de Tarefas</h1>

    <form action="inserir_tarefa.php" method="post">
        <label for="nome">Nome da Tarefa:</label>
        <input type="text" id="nome" name="nome" required><br><br>

        <label for="custo">Custo:</label>
        <input type="number" id="custo" name="custo" required><br><br>

        <label for="data">Data Limite:</label>
        <input type="date" id="data" name="data" required><br><br>

        <button type="submit">Adicionar Tarefa</button>
    </form>


     <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Custo (R$)</th>
                <th>Data Limite</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody id="taskTable">
    <?php

    $query = "SELECT * FROM tarefas ORDER BY ordem_apresentacao";
    $result = mysqli_query($conn, $query);

    while ($row = mysqli_fetch_assoc($result)) {
        echo "<tr>";
        echo "<td>{$row['nome_tarefa']}</td>";
        echo "<td>{$row['custo']}</td>";
        echo "<td>{$row['data_limite']}</td>";
        echo "<td>";
        echo "<button class='btn-edit' data-id='{$row['tarefa_id']}'>Editar</button>";
        echo "<button class='btn-order-up' data-id='{$row['tarefa_id']}'>↑</button>";
        echo "<button class='btn-order-down' data-id='{$row['tarefa_id']}'>↓</button>";
        echo "<button class='btn-delete' data-id='{$row['tarefa_id']}'>Excluir</button>";
        echo "</td>";
        echo "</tr>";
    }

    mysqli_close($conn); // Fechar a conexão
    ?>
</tbody>

    </table>

</body>
</html>
