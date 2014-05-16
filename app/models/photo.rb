class Photo < ActiveRecord::Base
  belongs_to :user

  validates :img_url, :user_id, presence: :true

  def self.all_db_photos
    s3 = User.aws_request
    all_photos = self.order(:created_at).reverse_order
    photos_hash = {}
      all_photos.map do |list_photo|
        obj = s3.buckets[ENV['PHOTIDIAN_BUCKET_NAME']].objects["#{list_photo.img_url}"]
        photos_hash[list_photo] = obj.read
      end
    return photos_hash
  end

end

