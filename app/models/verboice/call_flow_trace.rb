class Verboice::CallFlowTrace < Verboice::Api
  attribute :step_id, String
  attribute :step_name, String
  attribute :total, Integer

  def self.fetch call_flow_id, channel_id, start_date, end_date
    where(call_flow_id: call_flow_id, channel_id: channel_id, start_date: start_date, end_date: end_date)
  end
end
