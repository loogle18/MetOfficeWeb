class Station < ActiveRecord::Base
  has_many :climates, dependent: :destroy
  has_one :location, dependent: :destroy

  scope :ordered_by_name, -> { order(name: :asc) }
end
