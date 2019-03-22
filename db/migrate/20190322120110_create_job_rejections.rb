class CreateJobRejections < ActiveRecord::Migration[5.2]
  def change
    create_table :job_rejections do |t|
      t.references :user, foreign_key: true
      t.references :job, foreign_key: true

      t.timestamps
    end
  end
end
