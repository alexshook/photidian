class PhotosController < ApplicationController

  def index
    @user = current_user
  end

  def save_photo
    # from the AWS S3 documentation
      # access environment variables for AWS S3
      s3 = User.aws_request
      # grab the bucket for photidian app
      bucket = s3.buckets[ENV['PHOTIDIAN_BUCKET_NAME']]
      # update the bucket ACL (access control)
      bucket.acl = :public_read
      # get data from the js request
      data = params[:file]
      # name the file with username and current date and time
      file_name = "#{current_user.username}/" + Date.today.to_s.gsub(" ", "_") + ".jpg"
      # create the object for s3
      bucket.objects.create(file_name, data)
      # check response from s3
      return_data = {file: data}

    respond_to do |format|
      format.json { render json: return_data.to_json }
    end
  end

end
