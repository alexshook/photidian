class Photo < ActiveRecord::Base
  belongs_to :user

  validates :img_url, :user_id, presence: :true

end

