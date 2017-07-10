json.extract! @station, :id, :name, :created_at, :updated_at
json.location do
  json.extract! @station.location, :lat, :lon, :amsl
end
json.climates do
  json.array!(@station.climates.ordered_by_year) do |climate|
    json.extract! climate, :year, :temp_max, :temp_min, :rain, :af_days, :sun_hours
  end
end
json.url station_url(@station, format: :json)
