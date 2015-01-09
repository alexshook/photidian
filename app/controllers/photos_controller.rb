class PhotosController < ApplicationController
  before_action :authenticate_user!, except: [:index, :new]

  def index
    @display_20_recent = Photo.all_db_photos
  end

  def new
    @date_last_photo_today = Photo.check_date_last_photo(current_user)
    @photo = Photo.new
  end

  def show
    @photo = Photo.find params[:id]
    @user = @photo.user
    @display_photo = @user.db_photo(@photo.img_url)
    @tags = Tag.all
  end

  def create
    @photo = Photo.new

    s3 = Aws::request
    bucket = s3.buckets[ENV['PHOTIDIAN_BUCKET_NAME']]
    # update the bucket ACL (access control)
    bucket.acl = :public_read
    # get data from the js request
    data = params[:file]
    # name the file with username and current date and time
    file_name = "#{current_user.username}/" + Time.now.to_s.gsub(" ", "_") + ".jpg"
    # create the object for s3
    bucket.objects.create(file_name, data)

    # save photo and user params to the db
    @photo.img_url = file_name
    @photo.user_id = current_user.id
    @photo.save

    # check response from s3
    return_data = { id: "#{@photo.id}" }

    respond_to do |format|
      format.json { render json: return_data.to_json }
    end
  end

  def update
    @photo = Photo.find params[:id]
    if @photo.save photo_params
      redirect_to @photo
    else
      flash[:notice] = "Sorry, something went wrong."
    end
  end

  def add_tag
    @photo = Photo.find params[:photo]
    @tag = Tag.find params[:tags]
    @photo.add_tag(@tag)

    redirect_to @photo
  end

  private
  def photo_params
    params.require(:photo).permit(:user_id, :photo_id, tag_ids:[])
  end

end
