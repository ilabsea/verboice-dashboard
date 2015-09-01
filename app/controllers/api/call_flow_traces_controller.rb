class Api::CallFlowTracesController < ApplicationController
  def index
    @call_flow_traces = Verboice::CallFlowTrace.fetch params[:call_flow_id], params[:channel_id], params[:start_date], params[:end_date]

    render json: @call_flow_traces
  end

end
