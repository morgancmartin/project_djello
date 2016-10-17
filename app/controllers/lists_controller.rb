class ListsController < ApplicationController
  before_action :set_board
  before_action :set_list

  def create
    @list = List.new(list_params)
    if @board && @list.save
      respond_to do |format|
        format.json { render json: @list, status: 200 }
      end
    end
  end

  def index
    @lists = @board.lists if @board
    if @lists
      respond_to do |format|
        format.json { render json: @lists, include: :cards,  status: 200 }
      end
    end
  end

  def show
  end

  def edit
  end

  def update
    respond_to do |format|
      if @list && @list.update(list_params)
        format.json { render json: @list, status: 200 }
      else
        format.json { render json: @list, status: 422 }
      end
    end
  end

  def destroy
    respond_to do |format|
      if @list.destroy
        format.json { render json: @list, status: 200 }
      else
        format.json { render json: @list, status: 422 }
      end
    end
  end


  private

  def set_board
    @board = find_board_from_current_user(params[:board_id])
    puts 'STUFF'
    puts current_user
    puts params[:board_id]
  end

  def set_list
    @list = @board.lists.find_by_id(params[:id])
  end

  def list_params
    params.require(:list).permit(:id, :title, :description, :board_id)
  end

  def find_board_from_current_user(id)
    current_user.boards.find_by_id(id)
  end
end
