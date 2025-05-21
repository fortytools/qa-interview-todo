json.todos do
  json.array! @todos, partial: 'todos/todo', as: :todo
end