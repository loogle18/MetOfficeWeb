require 'rails_helper'

describe CreateLocationFromDataService do
  it 'creates location instance from cleaned data' do
    data = ' 50.898 Lon -1.408, 3metres amsl (1970 to 2000) '
    location = described_class.new(data).perform

    expect(Location.count).to eq(1)
    expect(location.lat).to eq('50.898')
    expect(location.lon).to eq('-1.408')
    expect(location.amsl).to eq('3')
  end
end
