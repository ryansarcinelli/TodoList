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
                <tr>
                    <td>${task.name}</td>
                    <td>${parseFloat(task.cost).toFixed(2)}</td>
                    <td>${task.deadline}</td>
                    <td>
                        <button class="btn-edit" data-id="${task.id}">Editar</button>
                        <button class="btn-order-up" data-id="${task.id}">↑</button>
                        <button class="btn-order-down" data-id="${task.id}">↓</button>
                        <button class="btn-delete" data-id="${task.id}">Excluir</button>
                    </td>
                </tr>`;
            taskTable.append(row);
        });
    });
}

// Atualizar a ordem de apresentação
$(document).on('click', '.btn-order-up, .btn-order-down', function () {
    const taskId = $(this).data('id');
    const action = $(this).hasClass('btn-order-up') ? 'up' : 'down';

    $.post('update_task_order.php', { id: taskId, action: action }, function (response) {
        alert(response);
        renderTasks(); // Atualizar tabela após a ordem ser alterada
    }).fail(function () {
        alert('Erro ao atualizar a ordem.');
    });
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

    $.post('edit_task.php', {
        id: taskId,
        name: newName,
        cost: newCost,
        deadline: newDeadline
    }, function (response) {
        alert(response);
        renderTasks(); // Atualizar tabela após a edição
    }).fail(function () {
        alert('Erro ao editar a tarefa.');
    });
});

// Excluir tarefa
$(document).on('click', '.btn-delete', function () {
    const taskId = $(this).data('id');

    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        $.post('excluir_tarefa.php', { id: taskId }, function (response) {
            alert(response); // Exibir mensagem de sucesso/erro
            renderTasks(); // Atualizar tabela sem recarregar a página
        }).fail(function () {
            alert('Erro ao excluir a tarefa.');
        });
    }
});

// Carregar tarefas ao carregar a página
$(document).ready(function () {
    // Botão editar
    $(document).on('click', '.btn-edit', function () {
        const taskId = $(this).data('id');
        const newName = prompt('Novo nome da tarefa:');
        const newCost = parseFloat(prompt('Novo custo da tarefa (R$):'));
        const newDeadline = prompt('Nova data limite:');

        if (!newName || isNaN(newCost) || !newDeadline) {
            alert('Dados inválidos!');
            return;
        }

        $.post('edit_task.php', {
            id: taskId,
            name: newName,
            cost: newCost,
            deadline: newDeadline
        }, function (response) {
            alert(response);
            renderTasks(); // Atualizar tabela após a edição
        }).fail(function () {
            alert('Erro ao editar a tarefa.');
        });
    });

    // Botão ordem (up e down)
    $(document).on('click', '.btn-order-up, .btn-order-down', function () {
        const taskId = $(this).data('id');
        const action = $(this).hasClass('btn-order-up') ? 'up' : 'down';

        $.post('update_task_order.php', { id: taskId, action: action }, function (response) {
            alert(response);
            renderTasks(); // Atualizar tabela após a ordem ser alterada
        }).fail(function () {
            alert('Erro ao atualizar a ordem.');
        });
    });
});


