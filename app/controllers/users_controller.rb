class UsersController < ApplicationController

  def index
    @users = User.all.limit(10)
    respond_to do |format|
      format.json { render json: @users, status: 200 }
    end
  end

  def update
    @user = User.find_by_id(params[:id])
    @resource = toggle_board if params[:board_id]
    @resource = toggle_card  if params[:card_id]
    if @user && @resource
      respond_to do |format|
        format.json { render json: @resource, status: 200 }
      end
    end
  end

  private

  def toggle_board
    @board = Board.find_by_id(params[:board_id])
    @user.toggle_board_ownership(@board)
  end

  def toggle_card
    @card = Card.find_by_id(params[:card_id])
    @user.toggle_card_ownership(@card)
  end
end
