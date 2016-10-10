class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @boards = current_user.boards
    @boards = @boards.with_children if params[:children]
    respond_to do |format|
      format.json { render json: @boards, status: 200 }
    end
  end

  def show
    @board = current_user.boards.find_by_id(params[:id])
    respond_to do |format|
      format.json { render json: @board, include: :lists, status: 200 }
    end
  end

  def create
    @board = current_user.boards.build(board_params)
    if @board.save
      respond_to do |format|
        format.json { render json: @board, status: 200 }
      end
    end
  end

  def destroy
    @board = current_user.boards.find_by_id(params[:id])
    if @board.destroy
      respond_to do |format|
        format.json { render json: @board, status: 200 }
      end
    end
  end

  def update
    @board = current_user.boards.find_by_id(board_params[:id])
    if @board && @board.update(board_params)
      respond_to do |format|
        format.json { render json: @board, status: 200 }
      end
    else
      respond_to do |format|
        format.json { render json: @board, status: 500}
      end
    end
  end

  private

  def board_params
    params.require(:board).permit(:id, :title)
  end
end
