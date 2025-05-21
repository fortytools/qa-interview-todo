const apiBaseUrl = 'http://localhost:3000';
const todoList = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const input = document.getElementById('new-todo');
const labelSelect = document.getElementById('todo-label-select');
const filterSelect = document.getElementById('filter-label');
const dueDateInput = document.getElementById('todo-due-date');

filterSelect.addEventListener('change', applyFilter);
let allTodos = []; // store all todos for filtering


function getBadgeClass(color) {
  switch (color) {
    case 'blue': return 'bg-primary';
    case 'green': return 'bg-success';
    case 'red': return 'bg-danger';
    default: return 'bg-secondary';
  }
}

// Fetch initial todos
async function fetchTodos(labelId=null) {
  const todosUrl = new URL('todos.json', apiBaseUrl)
  
  if (labelId) {
    todosUrl.searchParams.append('label_id', labelId);
  }

  const res = await fetch(todosUrl);
  const todos = await res.json();

  allTodos = todos.todos;
  return allTodos;
}

async function fetchLabels() {
  const res = await fetch(new URL('labels.json', apiBaseUrl));
  const labels = await res.json();
  
  const template = document.getElementById('label-option-template');


  labels.labels.forEach(label => {
    const clone = template.content.cloneNode(true);
    const option = clone.querySelector('.label-option');
    option.value = label.id;
    option.textContent = label.value;
    labelSelect.appendChild(option);
    filterSelect.appendChild(option.cloneNode(true)); // Clone for filter select
  });
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
  labelBadge.textContent = todo.label.value;
  labelBadge.classList.add(getBadgeClass(todo.label.color));

  if (todo.dueDate) {
    dueDateText.textContent = new Date(todo.dueDate).toLocaleDateString();
    dueDateDiv.classList.remove('d-none');
  }

  delBtn.onclick = () => deleteTodo(li, todo.id);

  todoList.appendChild(li);
}



// Add new todo
async function addTodo(title, label, dueDate) {
  const res = await fetch(new URL('todos', apiBaseUrl), {
    method: 'POST',
    body: JSON.stringify({ title: title, due_at: dueDate, label_id: label }),
    headers: { 'Content-Type': 'application/json' },
  });

  const todo = await res.json();
  // todo.label = label;
  todo.dueDate = todo.due_at

  allTodos.push(todo);
  applyFilter();
}


// Delete todo
async function deleteTodo(element, id) {
  await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE' });
  allTodos = allTodos.filter(t => t.id !== id);
  applyFilter(); // re-filter after delete
}

async function applyFilter() {
  const selected = filterSelect.value;
  if (selected === 'all') {
    // renderTodos(allTodos);
    console.error('You got me :P');
  } else {
    const filtered = await fetchTodos(selected);
    renderTodos(filtered);
  }
}


function renderTodos(todos) {
  todoList.innerHTML = '';
  todos.forEach(addTodoToDOM);
}

async function fetchAndRenderTodos() {
  fetchTodos().then(renderTodos);
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
fetchLabels();
fetchAndRenderTodos();
