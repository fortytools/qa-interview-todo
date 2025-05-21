class CreateTodos < ActiveRecord::Migration[8.0]
  def change
    create_table :todos do |t|
      t.references :label, null: false, foreign_key: true
      t.string :title
      t.datetime :due_at

      t.timestamps
    end
  end
end
