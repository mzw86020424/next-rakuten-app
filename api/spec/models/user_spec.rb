require 'rails_helper'

RSpec.describe User do
  describe 'validations' do
    let(:user) { described_class.new(sub: sub_value) }

    context 'subが存在しない場合' do
      let(:sub_value) { nil }

      it 'ユーザーは無効であること' do
        expect(user).not_to be_valid
        expect(user.errors[:sub]).to include("can't be blank")
      end
    end

    context 'subが存在する場合' do
      let(:sub_value) { "example_sub" }

      it 'ユーザーは有効であること' do
        expect(user).to be_valid
      end
    end
  end
end
