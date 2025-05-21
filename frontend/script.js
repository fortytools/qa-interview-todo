const todoList = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const input = document.getElementById('new-todo');
const labelSelect = document.getElementById('todo-label');
const filterSelect = document.getElementById('filter-label');
const dueDateInput = document.getElementById('todo-due-date');

filterSelect.addEventListener('change', applyFilter);
let allTodos = []; // store all todos for filtering


function getBadgeClass(label) {
  switch (label) {
    case 'Work': return 'bg-primary';
    case 'Personal': return 'bg-success';
    case 'Urgent': return 'bg-danger';
    default: return 'bg-secondary';
  }
}

// Fetch initial todos
async function fetchTodos() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const todos = await res.json();

  todos.forEach((todo, index) => {
    const labels = ['Work', 'Personal', 'Urgent', 'Other'];
    todo.label = labels[index % labels.length];
  });

  allTodos = todos;
  renderTodos(allTodos);
}

// Add todo to DOM
function addTodoToDOM(todo) {
  const template = document.getElementById('todo-template');
  const clone = template.content.cloneNode(true);

  const li = clone.querySelector('li');
  const titleSpan = clone.querySelector('.todo-title');
  const labelBadge = clone.querySelector('.todo-label');
  const dueDateDiv = clone.querySelector('.todo-due-date');
  const dueDateText = clone.querySelector('.todo-date-text');
  const delBtn = clone.querySelector('.delete-btn');

  // Fill in the data
  titleSpan.textContent = todo.title;
  labelBadge.textContent = todo.label;
  labelBadge.classList.add(getBadgeClass(todo.label));

  if (todo.dueDate) {
    dueDateText.textContent = new Date(todo.dueDate).toLocaleDateString();
    dueDateDiv.classList.remove('d-none');
  }

  delBtn.onclick = () => deleteTodo(li, todo.id);

  todoList.appendChild(li);
}



// Add new todo
async function addTodo(title, label, dueDate) {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify({ title: title, completed: false }),
    headers: { 'Content-Type': 'application/json' },
  });

  const todo = await res.json();
  todo.label = label;
  todo.dueDate = dueDate || null; // Store null if not set

  allTodos.push(todo);
  applyFilter();
}


// Delete todo
async function deleteTodo(element, id) {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE' });
  allTodos = allTodos.filter(t => t.id !== id);
  applyFilter(); // re-filter after delete
}

function applyFilter() {
  const selected = filterSelect.value;
  if (selected === 'All') {
    renderTodos(allTodos);
  } else {
    const filtered = allTodos.filter(todo => todo.label === selected);
    renderTodos(filtered);
  }
}


function renderTodos(todos) {
  todoList.innerHTML = '';
  todos.forEach(addTodoToDOM);
}

// Form submit handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = input.value.trim();
  const label = labelSelect.value;
  const dueDate = dueDateInput.value; // Optional

  if (title) {
    addTodo(title, label, dueDate);
    input.value = '';
    dueDateInput.value = '';
  }
});



// Initial load
fetchTodos();
