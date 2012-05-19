class Raffle < ActiveRecord::Base
  attr_accessible :amount, :limit, :name
  has_and_belongs_to_many :users
end
