class User < ActiveRecord::Base
  attr_accessible :ci, :name
  has_and_belongs_to_many :raffles
end
