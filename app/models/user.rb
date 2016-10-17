class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_and_belongs_to_many :boards, join_table: :board_members
  has_many :lists, through: :boards

  after_create :add_welcome_board

  def add_welcome_board
    @board = boards.create(title: 'Welcome Board(Click to rename)')
    @list = @board.lists.create(title: 'Basics(Click to rename)')
    @list.cards.create(title: 'Welcome to Djello!')
    @list.cards.create(title: 'This is a card.')
    @list.cards.create(title: "Click on a card to see what's behind it")
  end
end
