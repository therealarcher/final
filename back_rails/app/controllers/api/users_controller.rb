class Api::UsersController < ApplicationController

  # http://localhost:3000/api/users/new/?user_id=bob => adds 'bob' to db
  
  def new
    User.create!(name: params[:user_id])
    render json: current_user.id

  end
end
