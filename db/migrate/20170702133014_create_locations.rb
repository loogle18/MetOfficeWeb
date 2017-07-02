class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.decimal :lat
      t.decimal :lon
      t.decimal :amsl

      t.timestamps null: false
    end
  end
end
