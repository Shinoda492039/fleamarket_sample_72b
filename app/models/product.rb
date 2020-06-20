class Product < ApplicationRecord
  # belongs_to :user, foreign_key: 'user_id'
  belongs_to :category
  has_many :images
  accepts_nested_attributes_for :images, allow_destroy: true
  validates :images, presence: true

  def self.search(search)
    return Product.all unless search
    Product.where('name LIKE(?)', "%#{search}%")
  end
end
