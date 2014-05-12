class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = current_user
  end

private
  def user_params
    params.require(:user).permit(:username, :first_name, :last_name, :avatar)
  end
end
