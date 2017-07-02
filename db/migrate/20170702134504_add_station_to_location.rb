class AddStationToLocation < ActiveRecord::Migration
  def change
    add_reference :locations, :station, index: true, foreign_key: true
  end
end
