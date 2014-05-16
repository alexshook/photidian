require 'spec_helper'

describe "the signin process", :type => :feature do
  before :each do
    User.create(username: Faker::Internet.user_name, email: 'als304@gmail.com', password: 'qwertyqwerty', password_confirmation: 'qwertyqwerty')
  end

  it "signs me in" do
    visit 'users/sign_in'
    fill_in 'Email', with: 'als304@gmail.com'
    fill_in 'Password', with: 'qwertyqwerty'
    click_button 'Sign in'
    expect(page).to have_content 'My Profile'
  end

end
