class CreateCardMembers < ActiveRecord::Migration[5.0]
  def change
    create_table :card_members do |t|
      t.belongs_to :card, index: true
      t.belongs_to :user, index: true
    end
  end
end
