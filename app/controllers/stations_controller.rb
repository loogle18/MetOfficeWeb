class StationsController < ApplicationController
  before_action :load_and_build_stations, only: :index

  def index
    @stations = Station.all
  end

  def show
    @station = Station.find(params[:id])
  end

  private

  def load_and_build_stations
    CreateStationsFromDataService.new(
      StationApiConstants::BASE_URL,
      StationApiConstants::STATIONS
    ).perform unless  Station.count
  end
end
