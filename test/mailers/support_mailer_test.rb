require 'test_helper'

class SupportMailerTest < ActionMailer::TestCase
  test "bug_report" do
    mail = SupportMailer.bug_report
    assert_equal "Bug report", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
