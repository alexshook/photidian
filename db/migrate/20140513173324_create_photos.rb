class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :img_url
      t.references :user

      t.timestamps
    end
  end
end
