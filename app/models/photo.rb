class Photo < ActiveRecord::Base
  belongs_to :user

  # configure AWS environment variables for S3
  def self.aws_request
    return AWS::S3.new(:access_key_id => ENV['AWS_ACCESS_KEY_ID'], :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'])
  end

  def self.get_photos(user)
    s3 = Photo.aws_request
    bucket = s3.buckets[ENV['PHOTIDIAN_BUCKET_NAME']]

    # return bucket.objects.with_prefix(user).collect(&:key)

    # for some reason this is only returning the first one to me
    data_array = []
    bucket.objects.with_prefix(user).collect do |key|
      data_array << key.read
      return data_array
    end
  end

end
