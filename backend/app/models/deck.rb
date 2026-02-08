class Deck < ApplicationRecord
    validates :name, presence: true
    belongs_to :user
    has_many :cards, dependent: :destroy
end
