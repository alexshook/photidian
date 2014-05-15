class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find params[:id]
    @user_photos = User.get_photos(@user.username)
  end

private
  def user_params
    params.require(:user).permit(:avatar, :username, :first_name, :last_name,:location, :avatar, :password, :password_confirmation, :current_password, :follower_id, :following_id)
  end
end
