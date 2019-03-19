class JobsController < ApplicationController
  skip_before_action :authenticate_user!, only: :index
  skip_after_action :verify_scoped, only: :index

  def index
    @jobs = get_jobs.map { |job| Job.find_by(vincere_id: job["id"]) }
  end

  private

  def get_jobs
    response =  api_get("/job/search/fl=id,job_title,company,description,closed_date?q=closed_date:{NOW TO ALL]#&limit=100")
    jobs = response["result"]["items"]
    jobs.each do |job|
      if Job.find_by(vincere_id: job["id"]).nil?
        Job.create(
          vincere_id: job["id"],
          title: job["job_title"],
          company_name: job["company"]["name"] ,
          description: Nokogiri::HTML.parse(job["description"]).text,
          closing_date: job["closed_date"]
        )
      end
    end
  end
end
