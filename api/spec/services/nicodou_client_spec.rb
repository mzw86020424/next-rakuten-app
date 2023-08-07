require 'rails_helper'

RSpec.describe NicodouClient do
  describe  '#get' do
    subject { described_class.new.send(:get, endpoint, params) }

    before do
      allow(Net::HTTP).to receive(:new).and_return(http)
      allow(http).to receive(:request)
      allow(http).to receive(:use_ssl=).with(true)
    end

    let(:http) { instance_double(Net::HTTP) }
    let(:endpoint) { 'snapshot/video/contents/search' }
    let(:params) { { q: 'hoge' } }

    it 'http.requestが呼ばれること' do
      expect(http).to receive(:request).with(an_instance_of(Net::HTTP::Get))
      subject
    end
  end

  describe '#search_videos' do
    subject { described_class.new.search_videos(params) }

    before do
      allow(Net::HTTP).to receive(:new).and_return(http)
      allow(http).to receive(:request).and_return(response)
      allow(http).to receive(:use_ssl=).with(true)
    end

    let(:http) { instance_double(Net::HTTP) }
    let(:response) { instance_double(Net::HTTPResponse, code: '200', message: 'OK', body: '{"videos": []}') }
    let(:params) { { keyword: 'hoge' }}

    it 'APIからデータを取得できること' do
      expect(subject).to eq({ 'videos' => [] })
    end

    context 'APIがエラーを返した場合' do
      let(:response) { instance_double(Net::HTTPResponse, code: '500', message: 'Internal Server Error', body: '') }

      it 'エラーが発生すること' do
        expect { subject }.to raise_error(RuntimeError, 'Error: 500 Internal Server Error')
      end
    end
  end
end
