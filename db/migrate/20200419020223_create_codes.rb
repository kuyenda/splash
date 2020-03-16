class CreateCodes < ActiveRecord::Migration[5.2]
  def change
    create_table :codes do |t|
      t.belongs_to :sketch, index: true
      t.text :code
      t.timestamps
    end
  end
end
