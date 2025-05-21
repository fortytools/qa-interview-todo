class CreateLabels < ActiveRecord::Migration[8.0]
  def change
    create_table :labels do |t|
      t.string :value
      t.string :color

      t.timestamps
    end
  end
end
