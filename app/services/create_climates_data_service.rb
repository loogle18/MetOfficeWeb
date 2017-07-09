class CreateClimatesDataService
  NO_DATA_SIGN = '---'
  EXCESS_SIGNS = '#*'
  ZERO_FLOAT_PATTERN = /\A0.0+/

  attr_reader :data

  def initialize(data)
    @data = data
  end

  def perform
    build_and_return_climates_from_cleaned_data
  end

  private

  def build_and_return_climates_from_cleaned_data
    climates = []
    for year, data in get_data_per_year do
      temp_max = get_average_value_for(data[:temp_max_array])
      temp_min = get_average_value_for(data[:temp_min_array])
      af_days = get_average_value_for(data[:af_days_array])
      rain = get_average_value_for(data[:rain_array])
      sun_hours = get_average_value_for(data[:sun_hours_array])
      climates << Climate.create!(
        year: year,
        temp_max: temp_max,
        temp_min: temp_min,
        rain: rain,
        af_days: af_days,
        sun_hours: sun_hours
      )
    end
    climates
  end

  def get_data_per_year
    data_per_year = {}

    data.each do |line|
      values = line.split(' ')
      if year_data = data_per_year[values.first]
        year_data[:temp_max_array] << values[2]
        year_data[:temp_min_array] << values[3]
        year_data[:af_days_array] << values[4]
        year_data[:rain_array] << values[5]
        year_data[:sun_hours_array] << values[6]
      else
        data_per_year[values.first] = {
          temp_max_array: [values[2]],
          temp_min_array: [values[3]],
          af_days_array: [values[4]],
          rain_array: [values[5]],
          sun_hours_array: [values[6]]
        }
      end
    end

    data_per_year
  end

  def get_average_value_for(data)
    filtered_data = data.reject { |value| [NO_DATA_SIGN, ''].include?(value) }.compact

    if filtered_data.any?
      filtered_data.map! do |value|
        value.delete!(EXCESS_SIGNS)
        begin
          Float(value)
        rescue ArgumentError, TypeError
          value = 0.0
        end
      end

      average = '%.2f' % filtered_data.sum.fdiv(filtered_data.size)
      average.scan(ZERO_FLOAT_PATTERN).any? ? '0' : average
    else
      NO_DATA_SIGN
    end
  end
end
