module UsersHelper
  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

  def resource_class
    User
  end

  def get_attributes(user)
    attributes = []
    attributes.push(user.username, user.first_name, user.location, user.bio)
    if attributes.include?(nil)
      filtered_attributes = attributes.reject! { |attribute| attribute == nil }
    else
      filtered_attributes = attributes
    end
    return filtered_attributes
  end

end
