/**
 * Task Manager Application - Pair Version
 * Built with pair programming workflow
 * Demonstrates file-by-file development with AI assistance
 */

class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.initializeDOM();
        this.attachEventListeners();
    }

    initializeDOM() {
        this.form = document.getElementById('taskForm');
        this.input = document.getElementById('newTaskInput');
        this.errorDiv = document.getElementById('validationError');
        this.tasksList = document.getElementById('tasksList');
        this.noTasksMsg = document.getElementById('noTasksMessage');
        this.taskCounter = document.getElementById('taskCount');
        this.filterButtons = document.querySelectorAll('.filter-button');
    }

    attachEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleAddTask(e));

        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });
    }

    handleAddTask(e) {
        e.preventDefault();
        const title = this.input.value.trim();

        // Validation
        if (!this.validateTaskInput(title)) {
            return;
        }

        // Create and add task
        const task = this.createTask(title);
        this.tasks.push(task);

        // Reset form
        this.input.value = '';
        this.clearError();
        this.input.focus();

        // Re-render
        this.render();
    }

    validateTaskInput(title) {
        if (title === '') {
            this.showError('Please enter a task title');
            return false;
        }

        if (title.length > 150) {
            this.showError('Task title must be 150 characters or less');
            return false;
        }

        return true;
    }

    createTask(title) {
        return {
            id: Date.now(),
            title: title,
            completed: false,
            createdAt: new Date().toISOString()
        };
    }

    handleFilterChange(e) {
        const status = e.target.dataset.status;
        this.currentFilter = status;

        // Update active button
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Re-render
        this.render();
    }

    getFilteredTasks() {
        if (this.currentFilter === 'active') {
            return this.tasks.filter(task => !task.completed);
        }

        if (this.currentFilter === 'completed') {
            return this.tasks.filter(task => task.completed);
        }

        return this.tasks;
    }

    toggleTaskComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.render();
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.render();
    }

    render() {
        const filteredTasks = this.getFilteredTasks();

        // Clear current list
        this.tasksList.innerHTML = '';

        // Show/hide empty state
        if (filteredTasks.length === 0) {
            this.noTasksMsg.classList.add('visible');
        } else {
            this.noTasksMsg.classList.remove('visible');
        }

        // Render tasks
        filteredTasks.forEach(task => {
            const li = this.createTaskElement(task);
            this.tasksList.appendChild(li);
        });

        // Update counter
        this.updateCounter();
    }

    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('role', 'listitem');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.setAttribute('aria-label', `Mark task as ${task.completed ? 'incomplete' : 'complete'}`);
        checkbox.addEventListener('change', () => this.toggleTaskComplete(task.id));

        const label = document.createElement('label');
        label.className = 'task-label';
        label.textContent = this.escapeHtml(task.title);
        label.addEventListener('click', () => this.toggleTaskComplete(task.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'task-remove-btn';
        deleteBtn.textContent = '✕';
        deleteBtn.setAttribute('aria-label', 'Delete task');
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteBtn);

        return li;
    }

    updateCounter() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const active = total - completed;

        let text = `${total} ${total === 1 ? 'task' : 'tasks'}`;
        if (total > 0) {
            text += ` • ${active} active, ${completed} completed`;
        }

        this.taskCounter.textContent = text;
    }

    showError(message) {
        this.errorDiv.textContent = message;
        this.input.focus();
    }

    clearError() {
        this.errorDiv.textContent = '';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});
