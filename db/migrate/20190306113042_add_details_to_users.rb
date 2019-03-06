class AddDetailsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :phone_number, :string
    add_column :users, :gender, :string
    add_column :users, :dob, :date
    add_column :users, :location, :string
    add_column :users, :nationality, :string
    add_column :users, :experience, :integer
    add_column :users, :bio, :text
    add_column :users, :vincere_id, :integer
    add_column :users, :approved, :boolean, default: false
  end
end
