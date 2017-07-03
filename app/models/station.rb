class Station < ActiveRecord::Base
  has_many :climates, dependent: :destroy
  has_one :location, dependent: :destroy
end
