class AddCascadeToDecksTags < ActiveRecord::Migration[8.1]
  def change
    remove_foreign_key :decks_tags, :decks if foreign_key_exists?(:decks_tags, :decks)
    remove_foreign_key :decks_tags, :tags  if foreign_key_exists?(:decks_tags, :tags)

    add_foreign_key :decks_tags, :decks, on_delete: :cascade
    add_foreign_key :decks_tags, :tags,  on_delete: :cascade
  end
end
