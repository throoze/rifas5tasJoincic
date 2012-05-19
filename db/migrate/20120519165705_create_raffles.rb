class CreateRaffles < ActiveRecord::Migration
  def change
    create_table :raffles do |t|
      t.string :name
      t.integer :amount
      t.integer :limit

      t.timestamps
    end
  end
end
