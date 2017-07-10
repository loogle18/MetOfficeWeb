class StationsController < ApplicationController
  before_action :load_and_build_stations, only: :index

  def index
    @stations = Station.ordered_by_name
  end

  def show
    @station = Station.find(params[:id])
  end

  private

  def load_and_build_stations
    CreateStationsFromDataService.new(
      StationApiConstants::BASE_URL,
      StationApiConstants::STATIONS
    ).perform unless Station.exists?
  end
end
