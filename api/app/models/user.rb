class User < ApplicationRecord
  has_many :posts, dependent: :destroy

  validates :sub, presence: true

  # token情報を参照して対象のuserが存在する場合はuser情報を返し、存在しない場合は新規作成の処理を行う
  def self.from_token_payload(payload)
    # subはユーザーの一意なID
    find_by(sub: payload['sub']) || create!(sub: payload['sub'])
  end
end
