class Job < ApplicationRecord
  validates :title, :closing_date, :description, :company_name, :vincere_id, presence: true

  has_many :job_applications
  has_many :users, through: :job_applications
  has_many :likes
  has_many :liking_users, through: :likes, source: :user

  def set_salary(info)
    begin
      self.salary = Money.new(info["pay_rate"]*100, info["currency"]).format
      self.salary_type = info["salary_type"]
      save
    rescue => e
      puts e
      puts "no salary info available"
    end
  end

  def rejected?(user)
    JobRejection.where(job: self, user: user).any?
  end

  def applied_for?(user)
    JobApplication.where(job: self, user: user).any?
  end

  def liked?(user)
    Like.where(job: self, user: user).any?

  end

  def display_salary
    return "No salary information available" if salary.nil? || salary_type.nil?
    case salary_type
    when "ANNUAL"
      "#{salary} per year"
    when "MONTHLY"
      "#{salary} per month"
    when "WEEKLY"
      "#{salary} per week"
    when "DAILY"
      "#{salary} per day"
    when "HOURLY"
      "#{salary} per hour"
    end
  end
end
