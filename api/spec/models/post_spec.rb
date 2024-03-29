require 'rails_helper'

RSpec.describe Post do
  describe 'validations' do
    let!(:user) { create(:user) }

    context 'presence validations' do
      context 'titleが空の場合' do
        let(:post) { described_class.new(title: '', user: user) }

        it 'バリデーションエラーが返されること' do
          expect(post).not_to be_valid
          expect(post.errors[:title]).to include("can't be blank")
        end
      end

      context 'captionが空の場合' do
        let(:post) { described_class.new(caption: '', user: user) }

        it 'バリデーションエラーが返されること' do
          expect(post).not_to be_valid
          expect(post.errors[:caption]).to include("can't be blank")
        end
      end
    end

    context 'タイトルの長さによるテスト' do
      context 'タイトルが51文字以上の場合' do
        let(:post) { described_class.new(title: 'a' * 51, user: user) }

        it 'バリデーションエラーが返されること' do
          expect(post).not_to be_valid
          expect(post.errors[:title]).to include('is too long (maximum is 50 characters)')
        end
      end

      context 'タイトルが50文字の場合' do
        let(:post) { described_class.new(title: 'a' * 50, caption: 'Valid caption', user: user) }

        it 'バリデーションエラーが表示されないこと' do
          expect(post).to be_valid
        end
      end
    end

    context 'キャプションの長さによるテスト' do
      context 'キャプションが101文字以上の場合' do
        let(:post) { described_class.new(caption: 'a' * 101, user: user) }

        it 'バリデーションエラーが返されること' do
          expect(post).not_to be_valid
          expect(post.errors[:caption]).to include('is too long (maximum is 100 characters)')
        end
      end

      context 'キャプションが100文字の場合' do
        let(:post) { described_class.new(title: 'Valid title', caption: 'a' * 100, user: user) }

        it 'バリデーションエラーが表示されないこと' do
          expect(post).to be_valid
        end
      end
    end
  end
end
