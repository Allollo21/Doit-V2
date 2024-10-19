// Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Event Listeners
toDoBtn.addEventListener('click', handleSubmit);
toDoList.addEventListener('click', handleActions);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// Check if one theme has been set previously and apply it
let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ? changeTheme('standard') : changeTheme(savedTheme);

function appendTaskToTable(task) {
    const row = document.createElement('tr');
    row.dataset.id = task._id; // Set the task ID

    const taskCell = document.createElement('td');
    taskCell.innerText = task.description;
    row.appendChild(taskCell);

    const statusCell = document.createElement('td');
    statusCell.innerText = task.completed ? 'Completed' : 'Pending';
    row.appendChild(statusCell);

    const timestampCell = document.createElement('td');
    timestampCell.innerText = timeAgo(task.createdAt); // Correctly format the createdAt timestamp
    row.appendChild(timestampCell);

    const actionsCell = document.createElement('td');
    
    const updateBtn = document.createElement('button');
    updateBtn.innerHTML = '<i class="fas fa-edit"></i>';
    updateBtn.classList.add('update-btn');
    actionsCell.appendChild(updateBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    actionsCell.appendChild(deleteBtn);

    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkBtn.classList.add('check-btn');
    actionsCell.appendChild(checkBtn);

    row.appendChild(actionsCell);
    toDoList.appendChild(row);
}

// Theme Change function
function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = localStorage.getItem('savedTheme');

    document.body.className = color;
    color === 'darker' ? 
        document.getElementById('title').classList.add('darker-title')
        : document.getElementById('title').classList.remove('darker-title');

    document.querySelector('input').className = `${color}-input`;
    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ? 
            todo.className = `todo ${color}-todo completed` 
            : todo.className = `todo ${color}-todo`;
    });
    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
                button.className = `check-btn ${color}-button`;
            } else if (item === 'delete-btn') {
                button.className = `delete-btn ${color}-button`;
            } else if (item === 'update-btn') {
                button.className = `update-btn ${color}-button`;
            }
        });
    });
}

// Display the current date and time
const dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleString();