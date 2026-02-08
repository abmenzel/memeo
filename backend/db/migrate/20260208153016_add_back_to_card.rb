class AddBackToCard < ActiveRecord::Migration[8.1]
  def change
    add_column :cards, :back, :string
    add_column :cards, :rating, :integer, null: false, default: 0
  end
end
