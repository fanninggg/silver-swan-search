class Admin::UserPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(admin: false)
    end
  end

  def index?
    user.admin?
  end
end
