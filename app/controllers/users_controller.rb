class UsersController < ApplicationController

  before_action :authenticate_user!, except: [:index]

  def index
    @users = User.all
  end

  def show
    @user = User.find params[:id]
    @display_photos = @user.get_s3_photos
    @oldest_to_newest = @user.photos.newest_to_oldest
    @oldest_to_newest = @user.photos.oldest_to_newest

    # respond_to do |format|
    #   format.html
    #   format.js
    # end
  end

private
  def user_params
    params.require(:user).permit(:avatar, :username, :first_name, :last_name,:location, :bio, :avatar, :password, :password_confirmation, :current_password, :follower_id, :following_id)
  end

end
