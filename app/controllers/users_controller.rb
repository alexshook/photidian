class UsersController < ApplicationController

  before_action :authenticate_user!, except: [:index]

  def index
    @users = User.all
  end

  def show
    @user = User.find params[:id]
    @display_photos = @user.db_photos

    respond_to do |format|
      format.html
      format.js
    end

  end

private
  def user_params
    params.require(:user).permit(:avatar, :username, :first_name, :last_name,:location, :avatar, :password, :password_confirmation, :current_password, :follower_id, :following_id)
  end

end
