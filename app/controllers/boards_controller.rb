class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @boards = current_user.boards
    respond_to do |format|
      format.json { render :json => @boards, :status => 200 }
    end
  end

  def show
    @board = current_user.boards.find_by_id(params[:id])
    respond_to do |format|
      format.json { render :json => @board, :status => 200 }
    end
  end

  def create
    @board = current_user.boards.build(board_params)
    if @board.save
      respond_to do |format|
        format.json { render :json => @board, :status => 200 }
      end
    end
  end

  def destroy
    @board = current_user.boards.find_by_id(params[:id])
    if @board.destroy
      respond_to do |format|
        format.json { render :json => @board, :status => 200 }
      end
    end
  end

  def update

  end

  private

  def board_params
    params.require(:board).permit(:title)
  end
end
