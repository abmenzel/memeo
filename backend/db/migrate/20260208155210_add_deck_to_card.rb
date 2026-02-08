class AddDeckToCard < ActiveRecord::Migration[8.1]
  def change
    Card.delete_all
    add_reference :cards, :deck, null: false, foreign_key: true
  end
end
