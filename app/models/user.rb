class User < ApplicationRecord
  include PgSearch
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable

  has_many :fluent_languages, dependent: :destroy
  has_many :conversational_languages, dependent: :destroy

  pg_search_scope :search_by_gender, against: :gender
  pg_search_scope :search_by_location, against: :location

  def full_name
    "#{first_name} #{last_name}"
  end

  def age
    now = Date.today
    now.year - dob.year - ((now.month > dob.month || (now.month == dob.month && now.day >= dob.day)) ? 0 : 1)
  end

  def country_name
      country = ISO3166::Country[location]
      country.translations[I18n.locale.to_s] || country.name
  end

  def self.search_by_age(lower_limit, upper_limit)
   self.select { |user| user.age >= lower_limit.to_i && user.age <= upper_limit.to_i }
  end
end
