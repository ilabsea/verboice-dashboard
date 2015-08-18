class Verboice::CallFlow < Verboice::Api
  attribute :id, Integer
  attribute :name, String

  def self.collection project_id
    project_id ? fetch(project_id).map { |call_flow| [call_flow.name, call_flow.id]} : []
  end

  def self.fetch project_id
    where(project_id: project_id)
  end

end
