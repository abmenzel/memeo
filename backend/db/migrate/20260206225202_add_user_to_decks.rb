class AddUserToDecks < ActiveRecord::Migration[8.1]
  class Deck < ApplicationRecord
    self.table_name = 'decks'
  end

  def up
    Deck.delete_all

    add_reference :decks, :user, null: false, foreign_key: true
  end

  def down
    remove_reference :decks, :user, foreign_key: true
  end
end
