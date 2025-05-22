class Todo < ApplicationRecord
  belongs_to :label

  scope :by_label, ->(label_id) { where(label_id: label_id) }
  scope :ordered, -> { order(created_at: :desc) }

  validate :due_at_cannot_be_in_the_past

  private

  def due_at_cannot_be_in_the_past
    if due_at.present? && due_at.to_date < Date.today
      errors.add(:due_at, "can't be in the past")
    end
  end
end
