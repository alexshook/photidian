class UsersController < ApplicationController
  include UsersHelper
  include ApplicationHelper

  before_action :authenticate_user!, except: [:index]
  # TODO get private? method working and accessible by User and Photo. I think a method in app controller migth work, but maybe not for a before_filter
  def index
    @users = User.all
    following_photos = current_user.get_following_photos
    @feed = current_user.get_following_feed(following_photos)
    q = params[:q]
    @search_results = User.search_for(q)
  end

  def show
    @user = User.find params[:id]
    @display_photos = @user.get_s3_photos
    @oldest_to_newest = @user.photos.newest_to_oldest
    @oldest_to_newest = @user.photos.oldest_to_newest
    @filtered_attributes = User.get_attributes(@user)
  end

  def search
    q = params[:q]
    @users = User.search_for(q)
  end

private
  def user_params
    params.require(:user).permit(:avatar, :username, :first_name, :last_name,:location, :bio, :avatar, :password, :password_confirmation, :current_password, :follower_id, :following_id)
  end

end
