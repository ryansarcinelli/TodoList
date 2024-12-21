<?php
    include("database.php");
    include("add.php");

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
    <link rel="stylesheet" href="style.css">
    <script type="text/javascript" src="jquery-3.3.1.js"></script>
    <script src ="script.js" defer></script>
</head>

<body>
    <h1>Lista de Tarefas</h1>
    <!-- Formulário para incluir novas tarefas -->
    <form id="addTaskForm">
        <input type="text" id="taskName" placeholder="Nome da Tarefa" required>
        <input type="number" id="taskCost" step="0.01" placeholder="Custo (R$)" required>
        <input type="date" id="taskDeadline" required>
        <button type="submit">Adicionar Tarefa</button>
    </form>

    <!-- Tabela de Tarefas -->
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
            <!-- Tarefas dinâmicas -->
        </tbody>
    </table>

</body>
</html>
