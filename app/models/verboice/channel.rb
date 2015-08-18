class Verboice::Channel < Verboice::Api
  attribute :id, Integer
  attribute :name, String

  def self.collection
    all.map { |channel| [channel.name, channel.id] }
  end

end
