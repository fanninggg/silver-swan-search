class SupportMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.support_mailer.bug_report.subject
  #
  def bug_report(content, email)
    @content = content
    @email = email

    mail to: "bugs-r-bad@silverswan.co.uk"
  end
end
