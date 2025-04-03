document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const selectAllCheckbox = document.getElementById('select-all');
    const deleteAllBtn = document.getElementById('delete-all');
    const filterButtons = document.querySelectorAll('.filters .btn');
    let currentFilter = 'all';

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Format date for display
    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    // Check if date is overdue
    function isOverdue(dateString) {
        if (!dateString) return false;
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    }

    // Toggle delete all button visibility
    function toggleDeleteAllButton(show) {
        if (show && todos.length > 0) {
            deleteAllBtn.classList.remove('d-none');
        } else {
            deleteAllBtn.classList.add('d-none');
        }
    }

    // Delete all todos with confirmation
    function deleteAllTodos() {
        if (todos.length === 0) return;

        Swal.fire({
            title: 'Are you sure?',
            text: 'This will delete all tasks! This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete all!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                // Add fade out animation to all items
                const items = todoList.querySelectorAll('.todo-item');
                items.forEach(item => item.classList.add('removing'));

                setTimeout(() => {
                    todos = [];
                    saveTodos();
                    renderTodos();
                    selectAllCheckbox.checked = false;
                    toggleDeleteAllButton(false);

                    Swal.fire(
                        'Deleted!',
                        'All tasks have been deleted.',
                        'success'
                    );
                }, 300);
            } else {
                // If user cancels, uncheck the select all
                selectAllCheckbox.checked = false;
                toggleDeleteAllButton(false);
            }
        });
    }

    // Show error message using SweetAlert2
    function showError(message) {
        Swal.fire({
            title: 'Warning!',
            text: message,
            icon: 'warning',
            confirmButtonText: 'Got it',
            confirmButtonColor: '#ffc107',
            background: '#fff',
            iconColor: '#ffc107',
            showClass: {
                popup: 'animate__animated animate__shakeX'
            },
            customClass: {
                popup: 'swal-error-popup'
            }
        });
    }

    // Render todos
    function renderTodos() {
        todoList.innerHTML = '';
        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'active') return !todo.completed;
            if (currentFilter === 'completed') return todo.completed;
            return true;
        });

        filteredTodos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `list-group-item todo-item ${todo.completed ? 'completed' : ''}`;
            
            const dueDateClass = isOverdue(todo.dueDate) ? 'overdue' : '';
            
            li.innerHTML = `
                <input type="checkbox" class="form-check-input" ${todo.completed ? 'checked' : ''}>
                <span class="category-badge category-${todo.category}">${todo.category}</span>
                <span class="todo-text">${todo.text}</span>
                ${todo.dueDate ? `<span class="due-date ${dueDateClass}"><i class="far fa-calendar-alt"></i> ${formatDate(todo.dueDate)}</span>` : ''}
                <button class="btn btn-sm delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            // Toggle completion
            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => {
                todos[index].completed = !todos[index].completed;
                saveTodos();
                renderTodos();
            });

            // Delete todo
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                // Show confirmation dialog
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'Do you want to delete this task?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#dc3545',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        li.classList.add('removing');
                        setTimeout(() => {
                            todos.splice(index, 1);
                            saveTodos();
                            renderTodos();
                            Swal.fire(
                                'Deleted!',
                                'Your task has been deleted.',
                                'success'
                            );
                        }, 300);
                    }
                });
            });

            todoList.appendChild(li);
        });

        // Update select all checkbox state
        selectAllCheckbox.checked = todos.length > 0 && todos.every(todo => todo.completed);
        toggleDeleteAllButton(selectAllCheckbox.checked);
    }

    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Add new todo
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        const todoCategory = document.getElementById('todo-category').value;
        const todoDate = document.getElementById('todo-date').value;
        
        if (!todoText) {
            Swal.fire({
                title: 'Empty Task!',
                text: 'Please write something for your task',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#ffc107',
                confirmButtonText: 'OK',
                background: '#fff',
                iconColor: '#ffc107',
                showClass: {
                    popup: 'animate__animated animate__shakeX'
                }
            });
            return;
        }

        // Add success notification
        Swal.fire({
            title: 'Success!',
            text: 'Task added successfully',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            position: 'top-end',
            toast: true
        });

        todos.push({
            text: todoText,
            completed: false,
            category: todoCategory,
            dueDate: todoDate
        });
        saveTodos();
        renderTodos();
        todoInput.value = '';
        document.getElementById('todo-date').value = '';
    });

    // Select all functionality
    selectAllCheckbox.addEventListener('change', () => {
        const isChecked = selectAllCheckbox.checked;
        todos.forEach(todo => todo.completed = isChecked);
        saveTodos();
        renderTodos();
        toggleDeleteAllButton(isChecked);
    });

    // Delete all functionality
    deleteAllBtn.addEventListener('click', deleteAllTodos);

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            renderTodos();
        });
    });

    // Initial render
    renderTodos();
}); 