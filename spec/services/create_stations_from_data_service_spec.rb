require 'rails_helper'

describe CreateStationsFromDataService do
  it 'loads data from server and creates station instances' do
    stations_to_be_loaded = StationApiConstants::STATIONS.first(3)
    service = described_class.new(StationApiConstants::BASE_URL, stations_to_be_loaded).perform

    expect(service).to eq(stations_to_be_loaded)
    expect(Station.count).to eq(stations_to_be_loaded.length)
  end

  it 'loads data from server and creates location instances for each station' do
    stations_to_be_loaded = StationApiConstants::STATIONS.first(2)
    service = described_class.new(StationApiConstants::BASE_URL, stations_to_be_loaded).perform

    expect(Location.count).to eq(stations_to_be_loaded.length)
  end

  it 'loads data from server and creates minimum one climate instance for each station' do
    stations_to_be_loaded = StationApiConstants::STATIONS.first(2)
    service = described_class.new(StationApiConstants::BASE_URL, stations_to_be_loaded).perform

    Station.all.each do |station|
      expect(station.climates.count).to be >= 1
    end
  end

  it 'rescue from errors if data is absent and creates records for valid data' do
    valid_stations_to_be_loaded = StationApiConstants::STATIONS.first(2)
    all_stations_to_be_loaded = valid_stations_to_be_loaded + ['some_invalid_station']
    service = described_class.new(StationApiConstants::BASE_URL, all_stations_to_be_loaded).perform

    expect{ service }.not_to raise_error
    expect(Station.count).to eq(valid_stations_to_be_loaded.length)
  end

  it 'does not create duplicates if there is already some station with passed name' do
    station_name = StationApiConstants::STATIONS.first

    FactoryGirl.create(:station, name: station_name.titleize)

    service = described_class.new(StationApiConstants::BASE_URL, [station_name]).perform

    expect(Station.count).to eq(1)
  end
end
