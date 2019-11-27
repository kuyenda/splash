class Example < ApplicationRecord
  validates :title, presence: true
  validates :hit, presence: true, numericality: { only_integer: true }
  validates :like, presence: true, numericality: { only_integer: true }
  validates :digit, presence: true, uniqueness: true, length:{ is: 8 }

  def self.sample_digit
    symbols = ["a".."z", "A".."Z", "0".."9"].map{ |range| range.to_a }.flatten
    (0...8).map{ symbols[rand(symbols.size)] }.join
  end

end
