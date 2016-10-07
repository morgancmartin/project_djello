require 'rails_helper'

RSpec.describe BoardsController, type: :controller do

  let( :json ){ JSON.parse( response.body ) }

  before do
    Board.create()
    get :index, format: :json
  end

  it 'should respond with a success' do
    expect( response.status ).to eq( 200 )
  end

  it 'returns a valid JSON object' do
    expect( json ).to be_a Array
  end
end
