class AddSalaryToJob < ActiveRecord::Migration[5.2]
  def change
    add_column :jobs, :salary, :string
    add_column :jobs, :salary_type, :string
  end
end
