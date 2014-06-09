class Photo < ActiveRecord::Base
  belongs_to :user
  has_and_belongs_to_many :tags

  validates :img_url, :user_id, presence: :true

  scope :newest_to_oldest, -> { order('created_at DESC') }
  scope :oldest_to_newest, -> { order('created_at') }

  def self.all_db_photos
    s3 = Aws::request
    all_photos = self.order(:created_at).reverse_order.limit(20)
    photos_hash = {}
      all_photos.map do |list_photo|
        obj = s3.buckets[ENV['PHOTIDIAN_BUCKET_NAME']].objects["#{list_photo.img_url}"]
        photos_hash[list_photo] = obj.read
      end
    return photos_hash
  end

  def self.check_date_last_photo(user)
    todays_date = Time.now.to_s
    if user != nil
      if user.photos.last.img_url.include?(todays_date.gsub(/\s.*/, ''))
        return true
      else
        return false
      end
    end

  end

end

