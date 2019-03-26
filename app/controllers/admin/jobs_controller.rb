class Admin::JobsController < ApplicationController
  after_action :verify_authorized
  skip_after_action :verify_policy_scoped

  def index
    @jobs = Rails.cache.fetch("jobs", expires_in: 1.hour) do
      get_jobs.map { |job| Job.find_by(vincere_id: job["id"]) }
    end
    authorize [:admin, @jobs[0]]
  end
end
