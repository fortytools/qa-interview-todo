json.labels do
  json.array! @labels, partial: 'labels/label', as: :label
end