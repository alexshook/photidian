class PhotosController < ApplicationController

  def save_photo
    # from the AWS S3 documentation
      # access environment variables for AWS S3
      s3 = Photo.aws_request
      # grab the bucket for photidian app
      bucket = s3.buckets['photidian']
      # update the bucket ACL (access control)
      bucket.acl = :public_read
      # get data from the js request
      data = params[:file]
      # do i need to set the file name? file_name? file?
      # S3Object.store(data, open(data), 'photidian')
      obj = bucket.objects['key'].write(data)

    respond_to do |format|
      format.json { render json: return_data.to_json }
    end
  end

end
