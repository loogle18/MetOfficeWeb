class CreateLocationFromDataService
  DIGITS_PATTERN = /-?\d+\.?\d*/

  def initialize(data)
    @data = data
  end

  def perform
    build_and_return_location_from_cleaned_data
  end

  private

  def build_and_return_location_from_cleaned_data
    location_values = @data.scan(DIGITS_PATTERN)
    lat, lon, amsl = location_values[0], location_values[1], location_values[2]

    Location.create!(lat: lat, lon: lon, amsl: amsl)
  end
end
