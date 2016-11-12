json.title @board.title
json.id @board.id
json.users @board.users

json.lists @board.lists do |list|
  json.title list.title
  json.description list.description
  json.board_id list.board_id
  json.id list.id
  json.created_at list.created_at

  json.cards list.cards do |card|
    json.title card.title
    json.description card.description
    json.list_id card.list_id
    json.id card.id
    json.users card.users
  end
end
