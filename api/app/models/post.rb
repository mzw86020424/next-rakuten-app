class Post < ApplicationRecord
  belongs_to :user

  validates :title, length: { maximum: 50 }
  validates :caption, length: { maximum: 100 }
end
