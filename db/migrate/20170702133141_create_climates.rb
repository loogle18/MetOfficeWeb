class CreateClimates < ActiveRecord::Migration
  def change
    create_table :climates do |t|
      t.integer :year
      t.decimal :temp_max
      t.decimal :temp_min
      t.decimal :rain
      t.decimal :af_days
      t.decimal :sun_hours

      t.timestamps null: false
    end
  end
end
