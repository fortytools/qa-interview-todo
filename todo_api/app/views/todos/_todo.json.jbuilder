json.title todo.title
json.label do
  json.partial! 'labels/label', label: todo.label
end
json.due_at todo.due_at