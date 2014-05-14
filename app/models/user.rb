class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable, :timeoutable
  validates :username, presence: true

  has_attached_file :avatar,
    :storage => :s3,
    :url => ":s3_domain_url",
    :path => "/:class/:attachment/:id_partition/:style/:filename",
    :s3_credentials => Proc.new{|a| a.instance.s3_credentials },
    :styles => {
      :medium => "300x300>",
      :thumb => "100x100>"
    },
      :default_url => "http://placekitten.com/300/300"

  # validate s3 file upload - must come after has_attached_file
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  def s3_credentials
    {:bucket => ENV['PHOTIDIAN_BUCKET_NAME'], :access_key_id => ENV['AWS_ACCESS_KEY_ID'], :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY']}
  end

  # configure AWS environment variables for S3
  def self.aws_request
    return AWS::S3.new(:access_key_id => ENV['AWS_ACCESS_KEY_ID'], :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'])
  end

  # get objects from s3, read objects so they can display as images
  def self.get_photos(user)
    s3 = User.aws_request
    bucket = s3.buckets[ENV['PHOTIDIAN_BUCKET_NAME']]

    data_array = []
    bucket.objects.with_prefix(user).collect do |key|
      data_array << key.read
    end
    return data_array
  end

  def order_photos

  end
end
