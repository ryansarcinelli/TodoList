// Alternar modo noturno
const toggleThemeButton = document.getElementById('botaoNoturno');
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const img = toggleThemeButton.querySelector('img');
    img.src = document.body.classList.contains('dark-mode')
        ? 'img/noturno.png' // Ícone para modo claro
        : 'img/noturno.png'; // Ícone para modo noturno
});

// Array para armazenar tarefas
let tasks = [];

// Renderizar tabela de tarefas
function renderTasks() {
    const taskTable = document.getElementById('taskTable');
    taskTable.innerHTML = ''; // Limpa tabela

    // Ordenar tarefas por ordem de apresentação
    tasks.sort((a, b) => a.order - b.order);

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        if (task.cost >= 1000) row.classList.add('yellow-bg'); // Fundo amarelo para custo >= 1000

        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.cost.toFixed(2)}</td>
            <td>${task.deadline}</td>
            <td>
                <button class="btn-edit" onclick="editTask(${index})">Editar</button>
                <button class="btn-delete" onclick="deleteTask(${index})">Excluir</button>
                <button class="btn-up" onclick="moveTask(${index}, -1)">↑</button>
                <button class="btn-down" onclick="moveTask(${index}, 1)">↓</button>
            </td>
        `;
        taskTable.appendChild(row);
    });
}

// Adicionar nova tarefa
document.getElementById('addTaskForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('taskName').value;
    const cost = parseFloat(document.getElementById('taskCost').value);
    const deadline = document.getElementById('taskDeadline').value;

    if (tasks.some(task => task.name === name)) {
        alert('Uma tarefa com esse nome já existe!');
        return;
    }

    tasks.push({
        name,
        cost,
        deadline,
        order: tasks.length + 1 // Adiciona ao final da ordem
    });

    document.getElementById('addTaskForm').reset(); // Limpa o formulário
    renderTasks();
});

// Excluir tarefa
function deleteTask(index) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

// Editar tarefa
function editTask(index) {
    const task = tasks[index];
    const newName = prompt('Novo nome da tarefa:', task.name);
    const newCost = parseFloat(prompt('Novo custo da tarefa (R$):', task.cost));
    const newDeadline = prompt('Nova data limite:', task.deadline);

    if (!newName || isNaN(newCost) || !newDeadline) {
        alert('Dados inválidos!');
        return;
    }

    if (tasks.some((t, i) => t.name === newName && i !== index)) {
        alert('Uma tarefa com esse nome já existe!');
        return;
    }

    task.name = newName;
    task.cost = newCost;
    task.deadline = newDeadline;

    renderTasks();
}

// Mover tarefa na ordem
function moveTask(index, direction) {
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= tasks.length) return; // Verifica limites

    // Troca a ordem das tarefas
    const temp = tasks[index].order;
    tasks[index].order = tasks[newIndex].order;
    tasks[newIndex].order = temp;

    renderTasks();
}

// Inicializar tabela vazia
renderTasks();
