class PhotosController < ApplicationController

  def index

  end

  def json
    render json: {
      policy: s3_upload_policy_document,
      signature: s3_upload_signature,
      # check the params hash
      key: "uploads/#{current_user.id}/#{params[:file]}",
      success_action_redirect: '/'
    }
  end

  def s3_upload_policy_document
    Base64.encode64({
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
        ENV['AWS_SECRET_ACCESS_KEY'],
        s3_upload_policy_document
      )
    ).gsub(/\n/, '')
  end

end
