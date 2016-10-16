class CardsController < ApplicationController
  before_action :set_list, :set_card

  def create
    @card = Card.new(card_params)
    if @list && @card.save
      respond_to do |format|
        format.json { render json: @card, status: 200 }
      end
    end
  end

  def update
    respond_to do |format|
      if @card && @card.update(card_params)
        format.json { render json: @card, status: 200 }
      else
        format.json { render json: @card, status: 422 }
      end
    end
  end





  private

  def set_card
    @card = @list.cards.find_by_id(params[:id])
  end

  def set_list
    @list = find_list_from_current_user(params[:list_id])
  end

  def find_list_from_current_user(id)
    current_user.lists.find_by_id(id)
  end

  def card_params
    params.require(:card).permit(:id, :title, :description, :list_id)
  end
end
