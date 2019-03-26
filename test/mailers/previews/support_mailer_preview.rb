# Preview all emails at http://localhost:3000/rails/mailers/support_mailer
class SupportMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/support_mailer/bug_report
  def bug_report
    SupportMailer.bug_report
  end

end
