class Station < ActiveRecord::Base
  has_many :climates
  has_one :location
end
