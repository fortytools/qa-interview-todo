class Todo < ApplicationRecord
  scope :by_label, ->(label_id) { where(label_id: label_id) }
  scope :ordered, -> { order(created_at: :desc) }
  belongs_to :label
end
