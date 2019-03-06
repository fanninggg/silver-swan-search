class RegistrationsController < Devise::RegistrationsController
  after_action :assign_languages, only: [:update]

  def assign_languages
    return unless @user.valid?
    params[:user][:fluent_languages].each { |language| language.blank? ? next : FluentLanguage.create(language: language, user: @user) }
    params[:user][:conversational_languages].each { |language| language.blank? ? next : ConversationalLanguage.create(language: language, user: @user) }
  end
end
