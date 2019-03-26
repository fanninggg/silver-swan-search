class AddSectorToJobs < ActiveRecord::Migration[5.2]
  def change
    add_column :jobs, :sector, :string
  end
end
