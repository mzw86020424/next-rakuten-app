class Post < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 50 }
  validates :caption, presence: true, length: { maximum: 100 }
end
