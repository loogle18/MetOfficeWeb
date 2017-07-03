class ChangeColumnsTypeForClimateAndLocation < ActiveRecord::Migration
  def change
    change_table :climates do |t|
      t.change :temp_max, :string
      t.change :temp_min, :string
      t.change :rain, :string
      t.change :af_days, :string
      t.change :sun_hours, :string
    end

    change_table :locations do |t|
      t.change :lat, :string
      t.change :lon, :string
      t.change :amsl, :string
    end
  end
end
