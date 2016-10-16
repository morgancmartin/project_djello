json.title @board.title
json.id @board.id

json.lists @board.lists do |list|
  json.title list.title
  json.description list.description
  json.board_id list.board_id
  json.id list.id

  json.cards list.cards do |card|
    json.title card.title
    json.description card.description
    json.list_id card.list_id
    json.id card.id
  end
end
