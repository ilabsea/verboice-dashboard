class Api::TrafficsController < ApplicationController
  def index
    @chanel_traffic = Verboice::Traffic.fetch params[:project_id], params[:call_flow_id], params[:channel_id], params[:start_date], params[:end_date]

    respond_to do |format|
      format.html
      format.json { render json: @chanel_traffic}
    end
  end

end
