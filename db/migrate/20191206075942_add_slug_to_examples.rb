class AddSlugToExamples < ActiveRecord::Migration[5.2]
  def change
    add_column :examples, :slug, :string
    add_index :examples, :slug, unique: true
  end
end
