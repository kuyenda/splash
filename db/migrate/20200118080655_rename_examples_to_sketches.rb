class RenameExamplesToSketches < ActiveRecord::Migration[5.2]
  def change
    rename_table :examples, :sketches
    rename_column :sketches, :like, :clap
    rename_column :sketches, :hit, :view
    add_column :sketches, :type, :string
  end
end
