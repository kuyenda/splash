class UpdateSketches < ActiveRecord::Migration[5.2]
  def change
    # 标题
    add_column :sketches, :title, :string
    # 简介
    add_column :sketches, :description, :string
    # 颜色摘要
    add_column :sketches, :digest, :string
    # 用于别名ID查找
    add_column :sketches, :slug, :string
    add_index :sketches, :slug, unique: true
  end
end
