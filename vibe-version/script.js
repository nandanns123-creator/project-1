// Task Manager App - Vibe Version
let tasks = [];
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const errorMsg = document.getElementById('errorMsg');
const emptyState = document.getElementById('emptyState');
const statsText = document.getElementById('statsText');
const filterBtns = document.querySelectorAll('.filter-btn');

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderTasks();
    });
});

// Add Task Function
function addTask() {
    const title = taskInput.value.trim();
    
    // Validation
    if (title === '') {
        showError('Please enter a task title');
        return;
    }
    
    if (title.length > 100) {
        showError('Task title must be less than 100 characters');
        return;
    }
    
    // Clear error
    clearError();
    
    // Create task object
    const task = {
        id: Date.now(),
        title: title,
        completed: false,
        createdAt: new Date()
    };
    
    // Add to tasks array
    tasks.push(task);
    
    // Clear input
    taskInput.value = '';
    taskInput.focus();
    
    // Re-render
    renderTasks();
}

// Render Tasks
function renderTasks() {
    taskList.innerHTML = '';
    
    // Filter tasks
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    // Update stats
    updateStats();
    
    // Show/hide empty state
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        taskList.appendChild(emptyState);
        return;
    }
    
    emptyState.classList.remove('show');
    
    // Render each task
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="task-checkbox" data-task-id="${task.id}"></div>
            <span class="task-text">${escapeHtml(task.title)}</span>
            <button class="task-delete" data-task-id="${task.id}">✕</button>
        `;
        
        taskList.appendChild(li);
    });
    
    // Add event listeners to checkboxes and delete buttons
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.dataset.taskId);
            toggleComplete(taskId);
        });
    });
    
    document.querySelectorAll('.task-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const taskId = parseInt(e.target.dataset.taskId);
            deleteTask(taskId);
        });
    });
}

// Toggle Task Complete
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Delete Task
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
}

// Update Stats
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    
    statsText.textContent = `${total} ${total === 1 ? 'task' : 'tasks'} total • ${active} active • ${completed} completed`;
}

// Show Error Message
function showError(message) {
    errorMsg.textContent = message;
    taskInput.focus();
}

// Clear Error Message
function clearError() {
    errorMsg.textContent = '';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initial render
renderTasks();
