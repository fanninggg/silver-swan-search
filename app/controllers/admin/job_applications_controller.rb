class Admin::JobApplicationsController < ApplicationController
  after_action :verify_authorized

  def index
    @applications = policy_scope [:admin, JobApplication]
    authorize [:admin, @applications[0]]
  end
end
