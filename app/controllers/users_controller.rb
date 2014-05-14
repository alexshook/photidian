class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = current_user
  end

private
  def user_params
    params.require(:user).permit(:avatar, :username, :first_name, :last_name,:location, :avatar, :password, :password_confirmation, :current_password)
  end
end
