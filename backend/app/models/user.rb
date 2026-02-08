class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :decks, dependent: :destroy
  has_many :tags, dependent: :destroy

  normalizes :email_address, with: ->(e) { e.strip.downcase }
end
