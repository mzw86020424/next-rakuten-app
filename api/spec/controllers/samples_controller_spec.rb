require 'rails_helper'

RSpec.describe SamplesController do
  describe 'GET #index' do
    context 'sampleのデータが存在する場合' do
      let!(:sample1) { Sample.create! }
      let!(:sample2) { Sample.create! }
      let!(:sample3) { Sample.create! }

      it 'Sampleテーブルの全てのレコードが取得できる' do
        get :index
        expect(response).to have_http_status(:success)
        expect(response.body).to include(sample1.id.to_s, sample2.id.to_s, sample3.id.to_s)
      end
    end
  end
end
