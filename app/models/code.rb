class Code < ApplicationRecord
  belongs_to :sketch

  validates :sketch_id, presence: true
end
