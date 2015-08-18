class Api::ProjectsController < ApplicationController
  def index
    @verboice_projects = Verboice::Project.collection

    respond_to do |format|
      format.html
      format.json { render json: @verboice_projects}
    end
  end

end
