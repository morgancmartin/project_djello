class Card < ApplicationRecord
  belongs_to :list
  has_and_belongs_to_many :users, join_table: :card_members

  after_create :add_first_user

  def add_first_user
    list.board.users.first.cards << self
  end
end
