class CreateTagsDecksJoinTable < ActiveRecord::Migration[8.1]
  def change
    create_join_table :tags, :decks do |t|
      t.index :tag_id
      t.index :deck_id
    end
  end
end
