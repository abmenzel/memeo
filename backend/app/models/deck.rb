class Deck < ApplicationRecord
    validates :name, presence: true
    belongs_to :user
    has_many :cards, dependent: :destroy
    has_and_belongs_to_many :tags
end
