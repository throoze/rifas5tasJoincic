class HomeController < ApplicationController
  def index
    @raffles = Raffle.order('name ASC')

    respond_to do |format|
      format.html  # index.html.erb
      format.json  { render :json => @raffles }
    end
  end

  def getParticipants
    @raffle = Raffle.find(params[:raffle]);

    if @raffle.limit.nil?
      if @raffle.users.empty?
        @participants = User.all
      else
        @participants = User.where('id not in (?)',@raffle.user_ids)
      end
    else
      if @raffle.users.empty?
        @participants = User.limit(@raffle.limit)
      else
        @participants = User.where('id not in (?)',@raffle.user_ids).limit(@raffle.limit)
      end
    end

    respond_to do |format|
      format.json  { render :json => [@participants,@raffle] }
    end
  end
end
