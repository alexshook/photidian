class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable, :timeoutable
  validates :username, presence: true

  # s3 file upload
  has_attached_file :avatar,
    :storage => :s3,
    :url => ":s3_domain_url",
    :path => "/:class/:attachment/:id_partition/:style/:filename",
    :s3_credentials => {
      :bucket => ENV['PHOTIDIAN_BUCKET_NAME'],
      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'],
      },
    :styles => {
      :medium => "300x300>",
      :thumb => "100x100>"
    },
      :default_url => "http://placekitten.com/300/300"

  # validate s3 file upload - must come after has_attached_file
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

end
