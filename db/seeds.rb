require 'faker'

User.destroy_all

50.times do
  user = User.new(
    last_name: Faker::Name.last_name,
    gender: %w[Male Female].sample,
    phone_number: Faker::PhoneNumber.phone_number_with_country_code,
    dob: Faker::Date.birthday(18, 50),
    location: Country.all.map(&:alpha2).sample,
    nationality: Nationality::NATIONALITY.sample,
    experience: %w[1 2 3 4 5].sample,
    bio: Faker::Lorem.paragraph(3, true, 3),
    password: 'password'
  )
  user.first_name = Faker::Name.send("#{user.gender.downcase}_first_name")
  user.email = Faker::Internet.safe_email(user.full_name)
  user.save!
  LanguageList::COMMON_LANGUAGES.map(&:name).map { |l| l.match(/Greek/) ? 'Greek' : l }.map { |l| l.match(/Tonga/) ? 'Tonga' : l}.sample(rand(1..3)).each { |l| FluentLanguage.create(language: l, user: user) }
  LanguageList::COMMON_LANGUAGES.map(&:name).map { |l| l.match(/Greek/) ? 'Greek' : l }.map { |l| l.match(/Tonga/) ? 'Tonga' : l}.sample(rand(1..3)).each { |l| ConversationalLanguage.create(language: l, user: user) }
end
