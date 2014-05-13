class PhotosController < ApplicationController

  def index
    render json: {
      policy: s3_upload_policy_document,
      signature: s3_upload_signature,
      key: "uploads/#{SecureRandom.uuid}/#{params[:doc][:title]}",
      success_action_redirect: '/'
    }
  end

  def s3_upload_policy_document
    Base64.encode64(
    {
      expiration: 30.minutes.from_now.utc.strftime('%Y-%m-%dT%H:%M:%S.000Z'),
      conditions: [
        { bucket: ENV['PHOTIDIAN_BUCKET_NAME'] },
        { acl: 'public-read' },
        ["starts-with", "$key", "uploads/"],
        { success_action_status: '201' }
        ]
      }.to_json
    ).gsub(/\n|\r/, '')
  end

  def s3_upload_signature
    Base64.encode64(
      OpenSSL::HMAC.digest(
        OpenSSL::Digest::Digest.new('sha1'),
        ENV['AWS_SECRET_KEY_ID'],
        s3_upload_policy_document
      )
    ).gsub(/\n/, '')
  end

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

    respond_to do |format|
      format.json { render json: return_data.to_json }
    end
  end

end
