const form = document.getElementById('taskForm');
const tableBody = document.getElementById('taskTable');
let tasks = []; // Array para armazenar as tarefas

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obter valores do formulário
    const name = document.getElementById('taskName').value;
    const cost = parseFloat(document.getElementById('taskCost').value).toFixed(2);
    const deadline = document.getElementById('taskDeadline').value;
    const order = parseInt(document.getElementById('taskOrder').value);

    // Adicionar a tarefa ao array
    tasks.push({ order, name, cost, deadline });

    // Reordenar o array por ordem crescente
    tasks.sort((a, b) => a.order - b.order);

    // Atualizar a tabela
    renderTable();

    // Limpar o formulário
    form.reset();
});

// Função para renderizar a tabela
function renderTable() {
    // Limpar tabela
    tableBody.innerHTML = '';

    // Preencher tabela com as tarefas
    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.order}</td>
            <td>${task.name}</td>
            <td>${task.cost}</td>
            <td>${task.deadline}</td>
            <td>
                <a href="#" onclick="deleteTask(${task.order})">Excluir</a>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para excluir uma tarefa
function deleteTask(order) {
    // Filtrar a tarefa a ser excluída
    tasks = tasks.filter(task => task.order !== order);
    renderTable();
}