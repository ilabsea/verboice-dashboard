class Verboice::Project < Verboice::Api
  attribute :id, Integer
  attribute :name, String

  def self.collection
    all.map { |project| [project.name, project.id]}
  end

end
