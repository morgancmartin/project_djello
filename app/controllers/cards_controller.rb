class CardsController < ApplicationController
  before_action :get_list

  def create
    @card = Card.new(card_params)
    if @list && @card.save
      respond_to do |format|
        format.json { render json: @card, status: 200 }
      end
    end
  end





  private

  def get_list
    @list = find_list_from_current_user(params[:list_id])
  end

  def find_list_from_current_user(id)
    current_user.lists.find_by_id(id)
  end

  def card_params
    params.require(:card).permit(:id, :title, :description, :list_id)
  end
end
