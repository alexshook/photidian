class Photo < ActiveRecord::Base
  belongs_to :user

  # configure AWS environment variables for S3
  def self.aws_request
    return AWS::S3.new(:access_key_id => ENV['AWS_ACCESS_KEY_ID'], :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'])
  end

  def self.get_photos(username)
    aws = Photo.new_aws_request
    bucket = aws.buckets[ENV['PHOTIDIAN_BUCKET_NAME']]

    bucket.objects.with_prefix("#{username}").each(:limit => 500) do |photo|
      puts photo.key
    end
    # bucket.objects["#{username}_#{emotion}.png"] }
  end

end
