require 'rails_helper'

RSpec.describe Api::V1::NicodousController do
  describe '#index' do
    before do
      allow(NicodouClient).to receive(:new).and_return(nicodou_client)
    end

    let(:nicodou_client) { instance_double(NicodouClient) }

    context 'nicodou_clientが正常に動作する場合' do
      before do
        allow(nicodou_client).to receive(:search_videos).and_return(nicodous)
      end

      let(:nicodous) { [nicodou1, nicodou2, nicodou3] }
      let(:nicodou1) { { title: 'hoge', content: 'fuga' } }
      let(:nicodou2) { { title: 'hoge', content: 'fuga' } }
      let(:nicodou3) { { title: 'hoge', content: 'fuga' } }

      it 'nicodou_clientから取得したデータを返す' do
        get :index
        expect(response).to have_http_status(:success)
        expect(response.parsed_body)
          .to include(
            nicodou1.stringify_keys,
            nicodou2.stringify_keys,
            nicodou3.stringify_keys
          )
      end
    end
    # TODO: 共通のエラー処理を実装後に例外処理のテストを追加する
  end
end
