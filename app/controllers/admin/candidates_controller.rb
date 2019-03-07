class Admin::CandidatesController < ApplicationController
  before_action :confirm_admin

  def index
    @candidates = User.where(admin: false)
    return unless params[:search]
    @candidates = @candidates.search_by_gender(search_params[:gender]) unless search_params[:gender].blank?
    @candidates = @candidates.search_by_location(Country.find_country_by_name(search_params[:location]).alpha2) unless search_params[:location].blank?
    @candidates = @candidates.search_by_experience(search_params[:experience])
    unless search_params[:languages].delete_if(&:blank?).empty?
      search_params[:languages].delete_if(&:blank?).each { |language| @candidates = @candidates.search_by_language(language) }
    end
    @candidates = @candidates.search_by_age(search_params[:age_lower_limit], search_params[:age_upper_limit])
  end

  def confirm_admin
    redirect_to root_path unless current_user.admin?
  end

  def search_params
    params.require(:search).permit(:gender, :location, :age_lower_limit, :age_upper_limit, :experience, languages: [])
  end
end
