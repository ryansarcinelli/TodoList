// Alternar modo noturno
const toggleThemeButton = document.getElementById('botaoNoturno');
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const img = toggleThemeButton.querySelector('img');
    img.src = document.body.classList.contains('dark-mode')
        ? 'img/claro.png' // Ícone para modo claro
        : 'img/noturno.png'; // Ícone para modo noturno
});

// Renderizar tabela de tarefas
function renderTasks() {
    $.get('get_tasks.php', function (data) {
        const tasks = JSON.parse(data);
        const taskTable = $('#taskTable');
        taskTable.empty();

        tasks.forEach(task => {
            const row = `
                <tr class="${task.cost >= 1000 ? 'yellow-bg' : ''}">
                    <td>${task.name}</td>
                    <td>${parseFloat(task.cost).toFixed(2)}</td>
                    <td>${task.deadline}</td>
                    <td>
                        <button class="btn-edit" data-id="${task.id}">Editar</button>
                        <button class="btn-delete" data-id="${task.id}">Excluir</button>
                    </td>
                </tr>`;
            taskTable.append(row);
        });
    });
}

function loadTasks() {
    $.get('get_tasks.php', function (data) {
        if (data.error) {
            alert(data.error);
            return;
        }

        const taskTable = $('#taskTable');
        taskTable.empty();

        data.forEach(task => {
            const row = `
                <tr>
                    <td>${task.name}</td>
                    <td>${parseFloat(task.cost).toFixed(2)}</td>
                    <td>${task.deadline}</td>
                    <td>
                        <button class="btn-edit" onclick="openEditTask(${task.id}, '${task.name}', ${task.cost}, '${task.deadline}')">Editar</button>
                        <button class="btn-delete" onclick="deleteTask(${task.id})">Excluir</button>
                    </td>
                </tr>
            `;
            taskTable.append(row);
        });
    });
}

// Chamar função ao carregar a página
$(document).ready(function () {
    loadTasks();
});
// Adicionar nova tarefa
$('#addTaskForm').on('submit', function (e) {
    e.preventDefault();
    const formData = {
        name: $('#taskName').val(),
        cost: parseFloat($('#taskCost').val()),
        deadline: $('#taskDeadline').val()
    };

    $.post('add_task.php', formData, function (response) {
        alert(response);
        renderTasks();
    });
});

// Excluir tarefa
$(document).on('click', '.btn-delete', function () {
    const taskId = $(this).data('id');
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        $.post('delete_task.php', { id: taskId }, function (response) {
            alert(response);
            renderTasks();
        });
    }
});

// Editar tarefa
$(document).on('click', '.btn-edit', function () {
    const taskId = $(this).data('id');
    const newName = prompt('Novo nome da tarefa:');
    const newCost = parseFloat(prompt('Novo custo da tarefa (R$):'));
    const newDeadline = prompt('Nova data limite:');

    if (!newName || isNaN(newCost) || !newDeadline) {
        alert('Dados inválidos!');
        return;
    }

    $.post('edit_task.php', { id: taskId, name: newName, cost: newCost, deadline: newDeadline }, function (response) {
        alert(response);
        renderTasks();
    });
});

// Inicializar tabela
renderTasks();