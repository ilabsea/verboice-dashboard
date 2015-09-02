class Api::CallFlowsController < ApplicationController
  def index
    verboice_call_flows = Verboice::CallFlow.fetch params[:project_id]

    render json: verboice_call_flows
  end

  def show
    call_flow = Verboice::CallFlow.find(params[:id])

    render json: call_flow
  end

end
