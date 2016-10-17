class UsersController < ApplicationController

  def index
    @users = User.all.limit(10)
    respond_to do |format|
      format.json { render json: @users, status: 200 }
    end
  end

  def update
    @user = User.find_by_id(params[:id])
    @board = Board.find_by_id(params[:board_id])
    if @user && @board
      @user.boards << @board
      respond_to do |format|
        format.json { render json: @board, status: 200 }
      end
    end
  end
end
