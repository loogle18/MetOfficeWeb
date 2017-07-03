require 'open-uri'

class CreateStationsFromDataService
  NEW_LINE = "\n"
  DIGITS_PATTERN = /-?\d+.\d+/
  NAME_SEPARATOR_PATTERN = /(\/|  )/
  BASE_URL = 'http://www.metoffice.gov.uk/pub/data/weather/uk/climate/stationdata/'
  STATIONS = %w(
    aberporth armagh ballypatrick bradford braemar camborne cambridge cardiff chivenor cwmystwyth
    dunstaffnage durham eastbourne eskdalemuir heathrow hurn lerwick leuchars lowestoft manston nairn
    newtonrigg oxford paisley ringway rossonwye shawbury sheffield southampton stornoway suttonbonington
    tiree valley waddington whitby wickairport yeovilton
  )

  def perform
    STATIONS.each do |station|
      url = BASE_URL + station + 'data.txt'

      begin
        station_content = open(url) { |file| file.read }.split(NEW_LINE)
        build_data_from(station_content)
      rescue OpenURI::HTTPError
        puts '-' * url.length
        puts "There is no data for \"#{station.titleize}\" station or following url is broken:"
        puts url
        puts '-' * url.length
      end
    end
  end

  private

  def build_data_from(data)
    station_name = data.first.split(NAME_SEPARATOR_PATTERN).first
    location_data_lines = (data[1] + ' ' + data[2]).split('Lat').last

    return if Station.find_by(name: station_name)

    station = Station.create!(name: station_name)
    station.climates = create_climates_from(data)
    station.location = create_location_from(location_data_lines)
  end

  def create_climates_from(data)
    clean_data = []
    last_line_identifier_before_years = 'degC'

    data.reverse.each do |line|
      break if line.include?(last_line_identifier_before_years)
      clean_data << line
    end

    CreateClimatesDataService.new(clean_data).perform
  end

  def create_location_from(data)
    location_values = data.scan(DIGITS_PATTERN)
    lat, lon, amsl = location_values[0], location_values[1], location_values[2]

    Location.create!(lat: lat, lon: lon, amsl: amsl)
  end
end
