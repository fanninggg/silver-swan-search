class JobRejectionsController < ApplicationController
  def create
    @job = Job.find(params[:job_id])
    rejection = JobRejection.new(job: @job, user: current_user)
    authorize rejection
    if rejection.save
      render json: { response: 'success' }, status: 200
    else
      render json: { response: 'fail' }, status: 200
    end
  end
end
