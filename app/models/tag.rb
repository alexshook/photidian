class Tag < ActiveRecord::Base
  has_and_belongs_to_many :photos

  validates :name, presence: true

  def show
    @tag = Tag.find params[:id]
  end
end
