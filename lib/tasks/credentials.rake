require "#{Rails.root}/app/helpers/application_helper"
include ApplicationHelper

namespace :credentials do
  desc "Get new id token"
  task refresh: :environment do
    begin
      response = RestClient.post("https://id.vincere.io/oauth2/token?client_id=#{ENV['CLIENT_ID']}", {
          refresh_token: refresh_token,
          grant_type: 'refresh_token'
        }
      )
    rescue RestClient::BadRequest => e
      puts e.response
    end
    details = make_details(JSON.parse(response.body))
    Credential.first.update(details)
  end

  desc "Fetch credentials from online server"
  task fetch_credentials: :environment do
    response = RestClient.get("https://www.silverswansearch.com/credentials?key=#{ENV['CREDENTIALS_KEY']}")
    details = make_details(JSON.parse(response.body))
    Credential.first.update(details)
  end

end

def make_details(body)
    details = { id_token: body['id_token'], access_token: body['access_token']}
    details[:refresh_token] = body['refresh_token'] if body['refresh_token']
    return details
end
