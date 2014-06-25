class UsersController < ApplicationController
  include UsersHelper

  before_action :authenticate_user!, except: [:index]
  # TODO get private? method working and accessible by User and Photo. I think a method in app controller migth work, but maybe not for a before_filter
  before_action :is_private, only: [:show]

  def index
    @users = User.all
    following_photos = current_user.get_following_photos
    @feed = current_user.get_following_feed(following_photos)
    query = params[:query]
    @search_results = User.search_for(query)
  end

  def show
    @user = User.find params[:id]
    @display_photos = @user.get_s3_photos
    @oldest_to_newest = @user.photos.newest_to_oldest
    @oldest_to_newest = @user.photos.oldest_to_newest
    @filtered_attributes = User.get_attributes(@user)
  end

  def search
    query = params[:query]
    @users = User.search_for(query)
  end

private
  def user_params
    params.require(:user).permit(:avatar, :username, :first_name, :last_name,:location, :bio, :avatar, :password, :password_confirmation, :current_password, :follower_id, :following_id)
  end

  def is_private
    @user = User.find params[:id]
    privacy_setting = @user.private == true ? true : false
    if privacy_setting == true
      flash[:notice] = "Sorry, this user's profile is private. Please choose another user!"
      redirect_to users_path
    end

  end

end
