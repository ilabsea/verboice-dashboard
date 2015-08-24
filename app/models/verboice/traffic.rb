class Verboice::Traffic < Verboice::Api
  attribute :total_duration, String
  attribute :total_call, Integer
  attribute :date, Date

  def self.fetch project_id, call_flow_id, channel_id, start_date, end_date
    where(project_id: project_id, call_flow_id: call_flow_id, channel_id: channel_id, start_date: start_date, end_date: end_date)
  end
end
