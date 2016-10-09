class ListsController < ApplicationController

  def create
    @board = find_board_from_current_user(list_params[:board_id])
    @list = List.new(list_params)
    if @board && @list.save
      respond_to do |format|
        format.json { render json: @list, status: 200 }
      end
    end
  end

  def index
    puts 'PARAMS'
    params
    @board = find_board_from_current_user(params[:board_id])
    @lists = @board.lists if @board
    if @lists
      respond_to do |format|
        format.json { render json: @lists, status: 200 }
      end
    end
  end

  def show
  end

  def edit
  end

  def update
    @board = find_board_from_current_user(params[:board_id])
    if @board
      @list = @board.lists.find_by_id(list_params[:id])
      puts 'title'
      puts @list.title
      if @list && @list.update(list_params)
        respond_to do |format|
          format.json { render json: @list, status: 200 }
        end
      else
        respond_to do |format|
          format.json { render json: @list, status: 500}
        end
      end
    end
  end

  def destroy
    @board = find_board_from_current_user(params[:board_id])
    @list = @board.lists.find_by_id(params[:id])
    if @list.destroy
      respond_to do |format|
        format.json { render json: @list, status: 200 }
      end
    end
  end


  private

  def list_params
    params.require(:list).permit(:id, :title, :description, :board_id)
  end

  def find_board_from_current_user(id)
    current_user.boards.find_by_id(id)
  end
end
