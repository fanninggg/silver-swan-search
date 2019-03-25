require 'rest-client'
require 'json'

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :authorise, :credentials, :privacy]
  skip_after_action :verify_authorized

  def home
  end

  def privacy
  end

  def authorise
    unless params[:state] == 'requested'
      flash[:alert] = 'You are not authorised to be here'
      redirect_to root_path
    end
    code = params[:code]
    begin
      response = RestClient.post("https://id.vincere.io/oauth2/token?client_id=#{ENV['CLIENT_ID']}", {
          code: code,
          grant_type: 'authorization_code'
        }
      )
    rescue RestClient::BadRequest => e
      puts e.response
      redirect_to root_path
    end
    details = make_details(JSON.parse(response.body))
    if Credential.all.any?
      Credential.first.update(details)
    else
      Credential.create(details)
    end
    redirect_to root_path
  end

  def credentials
    if params[:key] == ENV['CREDENTIALS_KEY'] && request.protocol == 'https://'
      render json: {
        id_token: id_token,
        refresh_token: refresh_token,
        access_token: access_token
      }, status: 200
    else
      render json: {
        error: 'Not authorized'
      }, status: 401
    end
  end

  private

  def make_details(body)
    details = { id_token: body['id_token'], access_token: body['access_token']}
    details[:refresh_token] = body['refresh_token'] if body['refresh_token']
    return details
  end
end
