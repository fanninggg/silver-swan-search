class AddAcceptsTermsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :accepts_terms, :boolean, default: false
  end
end
