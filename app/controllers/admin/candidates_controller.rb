class Admin::CandidatesController < ApplicationController

  def index
    @candidates = User.all
    return unless params[:search]
    @candidates = @candidates.search_by_gender(search_params[:gender]) unless search_params[:gender].blank?
    @candidates = @candidates.search_by_location(Country.find_country_by_name(search_params[:location]).alpha2) unless search_params[:location].blank?
  end

  def search_params
    params.require(:search).permit(:gender, :location)
  end
end
