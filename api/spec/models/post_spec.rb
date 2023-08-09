require 'rails_helper'

RSpec.describe Post do
  describe 'validations' do
    let(:post) { Post.new(user: create(:user), title: title_content, caption: caption_content) }

    context 'タイトルの長さによるテスト' do
      let(:caption_content) { 'a' * 100 } # 複数のテストで再利用されるためデフォルトとして設定

      context 'タイトルが51文字以上の場合' do
        let(:title_content) { 'a' * 51 }

        it 'バリデーションエラーが返されること' do
          expect(post).not_to be_valid
          expect(post.errors[:title]).to include('is too long (maximum is 50 characters)')
        end
      end

      context 'タイトルが50文字の場合' do
        let(:title_content) { 'a' * 50 }

        it 'バリデーションエラーが表示されないこと' do
          expect(post).to be_valid
        end
      end
    end

    context 'キャプションの長さによるテスト' do
      let(:title_content) { 'a' * 50 } # 複数のテストで再利用されるためデフォルトとして設定

      context 'キャプションが101文字以上の場合' do
        let(:caption_content) { 'a' * 101 }

        it 'バリデーションエラーが返されること' do
          expect(post).not_to be_valid
          expect(post.errors[:caption]).to include('is too long (maximum is 100 characters)')
        end
      end

      context 'キャプションが100文字の場合' do
        let(:caption_content) { 'a' * 100 }

        it 'バリデーションエラーが表示されないこと' do
          expect(post).to be_valid
        end
      end
    end
  end
end

