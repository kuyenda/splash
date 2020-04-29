class Sketch < ApplicationRecord
  has_many :codes, dependent: :destroy
  accepts_nested_attributes_for :codes, allow_destroy: true

  extend FriendlyId
  friendly_id :digest, use: :slugged
  validates :title, presence: true

  validates :digest, presence: true, uniqueness: true, length:{ is: 8 }

  def self.create_digests
    symbols = ["a".."z", "A".."Z", "0".."9"].map{ |range| range.to_a }.flatten
    (0...8).map{ symbols[rand(symbols.size)] }.join
  end

end
