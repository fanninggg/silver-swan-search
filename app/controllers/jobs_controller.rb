class JobsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show]
  skip_after_action :verify_policy_scoped, only: :index

  def index
    @jobs = Rails.cache.fetch("jobs", expires_in: 1.hour) do
      get_jobs.map { |job| Job.find_by(vincere_id: job["id"]) }
    end
    @jobs = @jobs.delete_if { |job| job.applied_for?(current_user) || job.rejected?(current_user) } unless current_user.nil?
  end

  def show
    @job = Job.find(params[:id])
    authorize @job

    @vincere_job = Rails.cache.fetch("/vincere_job/#{@job.id}", expires_in: 2.hours) do
      api_get("/position/#{@job.vincere_id}")
    end
  end

  private

  def get_jobs
    response = api_get("/job/search/fl=id,job_title,company,description,closed_date?q=closed_date:{NOW TO ALL]#&limit=100")
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
