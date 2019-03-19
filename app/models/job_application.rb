class JobApplication < ApplicationRecord
  belongs_to :user
  belongs_to :job

  validates :user_id, uniqueness: { scope: :job_id, message: 'You can only apply for a job once' }
end
