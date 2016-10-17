class Board < ApplicationRecord
  has_and_belongs_to_many :users, join_table: :board_members
  has_many :lists
end
