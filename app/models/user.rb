class User < ApplicationRecord
  include PgSearch
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable

  has_many :fluent_languages, dependent: :destroy
  has_many :conversational_languages, dependent: :destroy
  has_one_attached :photo
  has_one_attached :cv

  validates :photo, blob: { content_type: :image }, allow_blank: true
  validates :cv, blob: { content_type: :text }, allow_blank: true

  pg_search_scope :search_by_gender, against: :gender
  pg_search_scope :search_by_location, against: :location
  pg_search_scope :search_by_language, associated_against: {
    conversational_languages: :language,
    fluent_languages: :language
  }

  def full_name
    "#{first_name} #{last_name}"
  end

  def age
    return 0 unless dob
    now = Date.today
    now.year - dob.year - ((now.month > dob.month || (now.month == dob.month && now.day >= dob.day)) ? 0 : 1)
  end

  def country_name
      country = ISO3166::Country[location]
      country.translations[I18n.locale.to_s] || country.name
  end

  def admin?
    admin
  end

  def self.search_by_age(lower_limit, upper_limit)
   select { |user| user.age >= lower_limit.to_i && user.age <= upper_limit.to_i }
  end

  def self.search_by_experience(query)
    case query
    when 'Less than a year'
      where(experience: 0)
    when '1-3'
      where("experience > 0 AND experience < 4")
    when '3-5'
      where("experience > 2")
    when '5+'
      where(experience: 5)
    else
      self
    end
  end
end
