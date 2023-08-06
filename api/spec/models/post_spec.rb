require 'rails_helper'

RSpec.describe Post do
  describe 'validations' do
    it 'titleが51文字以上のときはバリデーションエラーが返されること' do
      post = Post.new(title: 'a' * 51)
      expect(post).not_to be_valid
      expect(post.errors[:title]).to include('is too long (maximum is 50 characters)')
    end

    it 'captionが101文字以上のときはバリデーションエラーが返されること' do
      post = Post.new(caption: 'a' * 101)
      expect(post).not_to be_valid
      expect(post.errors[:caption]).to include('is too long (maximum is 100 characters)')
    end

    it 'titleが50文字、captionが100文字のときバリデーションエラーが表示されないこと' do
      post = Post.new(user: create(:user), title: 'a' * 50, caption: 'a' * 100)
      expect(post).to be_valid
    end
  end
end
