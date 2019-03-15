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
end
