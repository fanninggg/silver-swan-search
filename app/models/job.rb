class Job < ApplicationRecord
  validates :title, :closing_date, :description, :company_name, :vincere_id, presence: true
end
