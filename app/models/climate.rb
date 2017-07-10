class Climate < ActiveRecord::Base
  belongs_to :station

  scope :ordered_by_year, -> { order(year: :desc) }
end
