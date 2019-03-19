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
      redirect_to root_path
      flash[:notice] = 'Application received'
    else
      flash[:error] = 'Uh oh, something went wrong'
    end
  end
end
