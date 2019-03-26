class ApplicationController < ActionController::Base
  include Pundit
  include ApplicationHelper
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?
  after_action :verify_authorized, except: :index, unless: :skip_pundit?
  after_action :verify_policy_scoped, only: :index, unless: :skip_pundit?

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized



  protected

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(root_path)
  end

  def skip_pundit?
    devise_controller?
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :accepts_terms])
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :phone_number, :gender, :dob, :experience, :location, :nationality, :bio, :photo, :cv])
  end

  def get_jobs
    response = api_get("/job/search/fl=id,job_title,company,description,closed_date?q=closed_date:{NOW TO ALL]#&limit=100")
    raise StandardError, "No credentials" unless response.is_a?(Hash)
    jobs = response["result"]["items"]
    jobs.each do |job|
      if Job.find_by(vincere_id: job["id"]).nil?
        @job = Job.create(
          vincere_id: job["id"],
          title: job["job_title"],
          company_name: job["company"]["name"] ,
          description: Nokogiri::HTML.parse(job["description"]).text,
          closing_date: job["closed_date"]
        )

        @job.set_salary(api_get("/position/#{@job.vincere_id}")["compensation"])
      end
    end
  end
end
