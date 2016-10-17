class CreateBoardMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :board_members do |t|
      t.belongs_to :board, index: true
      t.belongs_to :user, index: true
    end
  end
end
