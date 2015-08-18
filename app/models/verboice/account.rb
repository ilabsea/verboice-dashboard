class Verboice::Account < Verboice::Api
  attribute :id, Integer
  attribute :email, String

  def self.collection
    all.map { |account| [account.email, account.id] }
  end

end
