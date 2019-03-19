class Admin::JobApplicationsController < ApplicationController
  def index
    @applications = JobApplication.all
  end
end
