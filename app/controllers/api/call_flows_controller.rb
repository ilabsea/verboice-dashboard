class Api::CallFlowsController < ApplicationController
  def index
    @verboice_call_flows = Verboice::CallFlow.fetch params[:project_id]

    respond_to do |format|
      format.html
      format.json { render json: @verboice_call_flows}
    end
  end

end
