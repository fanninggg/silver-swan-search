class LikesController < ApplicationController

  def create
    @job = Job.find(params[:job_id])
    like = Like.new(user: current_user, job: @job)
    authorize like
    if like.save
      render json: { response: 'success' }, status: 200
    else
      render json: { response: 'fail' }, status: 200
    end
  end
end
