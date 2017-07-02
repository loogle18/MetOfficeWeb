class AddStationToClimate < ActiveRecord::Migration
  def change
    add_reference :climates, :station, index: true, foreign_key: true
  end
end
