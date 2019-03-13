class JobApplication < ApplicationRecord
  belongs_to :user
  belongs_to :job

  validates :status, :vincere_id, presence: true
end
