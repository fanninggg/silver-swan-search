require 'rest-client'
require 'json'

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :authorise]
  skip_after_action :verify_authorized

  def home
  end

  def authorise
    unless params[:state] == 'requested'
      flash[:alert] = 'You are not authorised to be here'
      redirect_to root_path
    end
    code = params[:code]
    response = RestClient.post("https://id.vinceredev.com/oauth2/token?client_id=#{ENV['CLIENT_ID']}",
      {
        code: code,
        grant_type: 'authorization_code'
      },
      {
        content_type: 'application/x-www-form-urlencoded'
      }
    )
    details = make_details(JSON.parse(response.body))
    if Credentials.all.any?
      Credentials.first.update(details)
    else
      Credentials.create(details)
    end
  end

  private

  def make_details(body)
    details = { id_token: body['id_token'], access_token: body['access_token']}
    details[:refresh_token] = body['refresh_token'] if body['refresh_token']
    return details
  end
end
