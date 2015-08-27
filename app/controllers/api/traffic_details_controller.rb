class Api::TrafficDetailsController < ApplicationController
  def index
    @traffic_details = Verboice::TrafficDetail.fetch params[:project_id], params[:call_flow_id], params[:channel_id], params[:start_date], params[:end_date]

    respond_to do |format|
      format.html
      format.json { render json: @traffic_details }
    end
  end

end
