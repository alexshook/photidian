require 'spec_helper'

describe User do
  before :each do
    @user = User.create(username: Faker::Internet.user_name, email: 'als304@gmail.com', password: 'qwertyqwerty', password_confirmation: 'qwertyqwerty', id: 1)
    @user2 = User.create(username: Faker::Internet.user_name, email: 'alex@gmail.com', password: 'qwertyqwerty', password_confirmation: 'qwertyqwerty', id: 2)
  end

  describe "#following" do
    it "should check for a relationship" do
      @user.follow(@user2)
      @user.following?(@user2)
      expect @user.relationships.length.to be >= 1
    end
  end

  describe "#unfollow" do

  end

end #end describe User
