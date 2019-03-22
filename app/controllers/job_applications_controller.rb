class JobApplicationsController < ApplicationController

  def create
    job = Job.find(params[:job_id])
    application = JobApplication.new(user: current_user, job: job)
    authorize application
    if current_user.vincere_id.nil?
      application.status = 'Pending'
    else
      # code to submit application to platform once Silver Swan say we can do this
    end
    if application.save
      render json: { response: 'success' }, status: 200
    else
      render json: { response: 'fail' }, status: 200
    end
  end

  def index
    @applications = policy_scope(JobApplication)
  end

  def show
    @application = JobApplication.find(params[:id])
    authorize @application
  end
end
