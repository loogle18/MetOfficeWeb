require 'open-uri'

class CreateStationsFromDataService
  URL_END = 'data.txt'
  NEW_LINE = "\n"
  NAME_SEPARATOR_PATTERN = /(\/|  )/
  LAT_SEPARATOR = 'Lat'
  LAST_LINE_IDENTIFIER_BEFORE_YEARS = 'degC'

  def initialize(base_url, stations)
    @base_url = base_url
    @stations = stations
  end

  def perform
    @stations.each do |station|
      url = @base_url + station + URL_END

      begin
        station_content = open(url) { |file| file.read }.split(NEW_LINE)
        build_data_from(station_content)
      rescue OpenURI::HTTPError
        unless ENV['RAILS_ENV'] == 'test'
          puts '-' * url.length
          puts 'There is no data for \"#{station.titleize}\" station or following url is broken:'
          puts url
          puts '-' * url.length
        end
      end
    end
  end

  private

  def build_data_from(data)
    station_name = data.first.split(NAME_SEPARATOR_PATTERN).first
    location_data_lines = (data[1] + ' ' + data[2]).split(LAT_SEPARATOR).last

    return if Station.find_by(name: station_name)

    station = Station.create!(name: station_name)
    station.climates = create_climates_from(data)
    station.location = CreateLocationFromDataService.new(location_data_lines).perform
  end

  def create_climates_from(data)
    clean_data = []

    data.reverse.each do |line|
      break if line.include?(LAST_LINE_IDENTIFIER_BEFORE_YEARS)
      clean_data << line
    end

    CreateClimatesDataService.new(clean_data).perform
  end
end
