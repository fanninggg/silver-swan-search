module ApplicationHelper
  def refresh_token
    Credential.all.first.refresh_token
  end

  def id_token
    Credential.all.first.id_token
  end

  def access_token
    Credential.all.first.access_token
  end

  def api_get(end_point)
    begin
      response = RestClient.get("https://silverswanrecruitment.vincere.io/api/v2#{end_point}", {
        "id-token" => id_token,
        "x-api-key" => ENV["VINCERE_API_KEY"]
      })
      JSON.parse(response.body)
    rescue RestClient::ExceptionWithResponse => err
      err.response.body
    end
  end

  def api_post(end_point, payload={})
    begin
      response = RestClient.post("https://silverswanrecruitment.vincere.io/api/v2#{end_point}", payload, {
        "id-token" => id_token,
        "x-api-key" => ENV["VINCERE_API_KEY"]
      })
      JSON.parse(response.body)
    rescue RestClient::ExceptionWithResponse => err
      err.response
    end
  end

  def api_put(end_point, payload={})
    begin
      response = RestClient.put("https://silverswanrecruitment.vincere.io/api/v2#{end_point}", payload, {
        "id-token" => id_token,
        "x-api-key" => ENV["VINCERE_API_KEY"]
      })
      JSON.parse(response.body)
    rescue RestClient::ExceptionWithResponse => err
      err.response
    end
  end

  def api_delete(end_point)
    begin
      response = RestClient.delete("https://silverswanrecruitment.vincere.io/api/v2#{end_point}", {
        "id-token" => id_token,
        "x-api-key" => ENV["VINCERE_API_KEY"]
      })
      JSON.parse(response.body)
    rescue RestClient::ExceptionWithResponse => err
      err.response
    end
  end
end
