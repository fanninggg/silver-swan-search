class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.integer :vincere_id
      t.string :title
      t.datetime :closing_date
      t.text :description
      t.string :company_name

      t.timestamps
    end
  end
end
