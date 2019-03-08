class AddUkEligibilityToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :uk_eligibility, :boolean, default: false
  end
end
