require 'rails_helper'

RSpec.describe NicodouClient do
  describe  '#get' do
    subject { described_class.new.send(:get, endpoint, params) }

    before do
      allow_any_instance_of(Net::HTTP).to receive(:request)
    end

    let(:endpoint) { 'snapshot/video/contents/search' }
    let(:params) { { q: 'hoge' } }

    it 'http.requestが呼ばれること' do
      expect_any_instance_of(Net::HTTP).to receive(:request).with(an_instance_of(Net::HTTP::Get))
      subject
    end
  end

  describe '#search_videos' do
    subject { described_class.new.search_videos(params) }

    before do
      allow_any_instance_of(described_class).to receive(:get).and_return(
        OpenStruct.new(code: '200', message: 'OK', body: '{}')
      )
    end

    let(:endpoint) { 'snapshot/video/contents/search' }
    let(:params) { { keyword: 'hoge' } }

    it 'getが特定の引数とともに呼ばれること' do
      expect_any_instance_of(described_class).to receive(:get).with(
        endpoint,
        {
          q: 'hoge',
          _sort: 'viewCounter',
          targets: 'title,description,tags',
          fields: 'title,description,tags',
          _context: 'my-api'
        }
      )
      subject
    end
  end
end
