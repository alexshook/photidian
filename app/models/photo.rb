class Photo < ActiveRecord::Base
  belongs_to :user

  # configure AWS environment variables for S3
  def self.aws_request
    return AWS::S3.new(:access_key_id => ENV['AWS_ACCESS_KEY_ID'], :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'])
  end

# get objects from s3, read objects so they can display as images
  def self.get_photos(user)
    s3 = Photo.aws_request
    bucket = s3.buckets[ENV['PHOTIDIAN_BUCKET_NAME']]

    data_array = []
    bucket.objects.with_prefix(user).collect do |key|
      data_array << key.read
    end
    return data_array
  end

end

# need to handle getting photos a different way-- don't use  current user because it can only get the current user's files
