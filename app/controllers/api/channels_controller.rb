class Api::ChannelsController < ApplicationController
  def index
    @verboice_channels = Verboice::Channel.collection(params[:account_id])

    respond_to do |format|
      format.html
      format.json { render json: @verboice_channels}
    end
  end

end
