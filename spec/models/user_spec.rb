require 'spec_helper'

describe User do
  before :each do
    user = User.create(username: Faker::Internet.user_name, email: 'als304@gmail.com', password: 'qwertyqwerty', password_confirmation: 'qwertyqwerty', id: 1)
    user2 = User.create(username: Faker::Internet.user_name, email: 'alex@gmail.com', password: 'qwertyqwerty', password_confirmation: 'qwertyqwerty', id: 2)
  end

  describe "#db_photos" do
    it "should return object information from the database and data from S3" do
      photos = user.db_photos
      expect photo_hash.to_include :username
    end
  end

  describe "#following" do
    it "should check for a relationship" do
      user.follow(user2)
      user.following?(user2)
      expect user.relationships.to be_true
    end
  end

  describe "#unfollow" do

  end

end #end describe User
