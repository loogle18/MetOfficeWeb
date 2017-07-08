json.array!(@stations) do |station|
  json.extract! station, :id, :name, :created_at, :updated_at
  json.location do
    json.extract! station.location, :lat, :lon, :amsl
  end
  json.url station_url(station, format: :json)
end
