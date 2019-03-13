class ConversationalLanguage < ApplicationRecord
  belongs_to :user

  validates :language, presence: true
end
