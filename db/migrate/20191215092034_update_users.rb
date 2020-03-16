class UpdateUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :name, :string
    add_column :users, :email, :string
    add_column :users, :password_digest, :string
    add_column :users, :remember_digest, :string
    add_index :users, :email, unique: true
  end
end
