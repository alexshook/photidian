require 'spec_helper'

describe "view profile", :type => :feature do
  before :each do
    user = User.create(username: Faker::Internet.user_name, email: 'als304@gmail.com', password: 'qwertyqwerty', password_confirmation: 'qwertyqwerty')
  end

  it "signs me in" do
    visit 'users/sign_in'
    fill_in 'Email', with: 'als304@gmail.com'
    fill_in 'Password', with: 'qwertyqwerty'
    click_button 'Sign in'
    expect(page).to have_content 'My Photos'
  end

  it "visits my profile page" do
    visit 'users/1'
    expect(page).to have_content :username
  end

  it "edits my profile page" do
    visit 'users/1'
    click_on "Edit Profile"
    expect(page).to have_content 'Upload a profile photo'
  end

  it "should take a photo" do
    # visit 'photos/new'
  end

end
