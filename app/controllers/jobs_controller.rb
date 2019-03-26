class JobsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show]
  skip_after_action :verify_authorized, only: [:liked_jobs]
  skip_after_action :verify_policy_scoped, only: :index

  def index
    @jobs = Rails.cache.fetch("jobs", expires_in: 1.hour) do
      get_jobs.map { |job| Job.find_by(vincere_id: job["id"]) }
    end
    @jobs = @jobs.delete_if { |job| job.applied_for?(current_user) || job.rejected?(current_user) || job.liked?(current_user) } unless current_user.nil?
  end

  def show
    @job = Job.find(params[:id])
    authorize @job

    @vincere_job = Rails.cache.fetch("vincere_job/#{@job.id}", expires_in: 2.hours) do
      response = api_get("/position/#{@job.vincere_id}")
      raise StandardError, "No credentials" unless response.is_a?(Hash)
      response
    end
  end

  def liked_jobs
    @jobs = current_user.liked_jobs
  end
end
