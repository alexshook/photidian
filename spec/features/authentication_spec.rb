require 'spec_helper'

describe 'A user can sign in' do
  it 'should sign in the user given a valid username and password' do
    User.create(username: Faker::Internet.user_name, email: 'als304@gmail.com', password: 'qwertyqwerty', password_confirmation: 'qwertyqwerty')
    visit 'users/sign_in'
    fill_in 'Email', with: 'als304@gmail.com'
    fill_in 'Password', with: 'qwertyqwerty'
    click_button 'Sign in'
    expect(page).to have_content 'My Profile'
  end

end
