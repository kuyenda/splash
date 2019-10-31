class AddDetailsToExamples < ActiveRecord::Migration[5.2]
  def change
    add_column :examples, :hit, :integer
    add_column :examples, :like, :integer
    add_column :examples, :description, :string
    add_column :examples, :digit, :string
    remove_column :examples, :url, :string
  end
end
