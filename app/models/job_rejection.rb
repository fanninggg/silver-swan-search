class JobRejection < ApplicationRecord
  belongs_to :user
  belongs_to :job

  validates :user_id, uniqueness: {scope: :job_id, message: 'you can only reject a job once'}
end
