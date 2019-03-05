class CreateCredentials < ActiveRecord::Migration[5.2]
  def change
    create_table :credentials do |t|
      t.string :id_token
      t.string :access_token
      t.string :refresh_token

      t.timestamps
    end
  end
end
