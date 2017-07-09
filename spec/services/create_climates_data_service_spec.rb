require 'rails_helper'

describe CreateClimatesDataService do
  it 'creates climate instances for each year' do
    data = [
      '2017   6   17.8    11.8       0   105.4   171.6#  Provisional',
      '2016  12   10.0     5.4       1    54.2    46.5*'
    ]
    climates = described_class.new(data).perform

    expect(Climate.count).to eq(data.length)
  end

  it 'removes excess symbols from data' do
    data = ['2017   6   17.8    11.8       0   105.4   171.6*#']
    climates = described_class.new(data).perform

    expect(climates.first.sun_hours).to eq('171.60')
  end

  it 'does not create instances with same year, but create average value for each column' do
    data = [
      '2017   6   17.8    11.8       0   105.4   171.6#',
      '2017   5   16.2     9.4       0    32.4   224.3#'
    ]
    climates = described_class.new(data).perform
    first_climate = climates.first

    expect(climates.count).to eq(1)
    expect(first_climate.temp_max).to eq('17.00')
    expect(first_climate.temp_min).to eq('10.60')
    expect(first_climate.rain).to eq('68.90')
    expect(first_climate.sun_hours).to eq('197.95')
  end

  it 'does not create floating values for zeros' do
    data = [
      '2017   6   17.8    11.8       0   105.4   171.6#',
      '2017   5   16.2     9.4       0.0   32.4   224.3#',
      '2017   4   11.5     6.6       0.00    16.6   158.6#'
    ]
    climates = described_class.new(data).perform

    expect(climates.first.af_days).to eq('0')
  end

  it 'does not include values with "---" symbol in average calculation' do
    data = [
      '2017   6   17.8    11.8       0   105.4   171.6#',
      '2017   5   16.2     9.4       0    32.4   224.3#',
      '2017   4   ---     6.6       0    16.6   158.6#'
    ]
    climates = described_class.new(data).perform

    expect(climates.first.temp_max).to eq('17.00')
  end

  it 'sets value to "---" symbol as average value if all values in some data column equal to "---"' do
    data = [
      '2017   6   ---    11.8       0   105.4   171.6#',
      '2017   5   ---     9.4       0    32.4   224.3#',
      '2017   4   ---     6.6       0    16.6   158.6#'
    ]
    climates = described_class.new(data).perform

    expect(climates.first.temp_max).to eq('---')
  end
end
