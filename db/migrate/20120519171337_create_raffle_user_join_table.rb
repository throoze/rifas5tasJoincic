class CreateRaffleUserJoinTable < ActiveRecord::Migration
  def up
    create_table :raffles_users, :id => false do |t|
      t.integer :raffle_id
      t.integer :user_id
    end
  end

  def down
    drop_table :raffles_users
  end
end
