module PhotosHelper
  def has_tags(photo)
    true if photo.tags.length > 0
  end

end
