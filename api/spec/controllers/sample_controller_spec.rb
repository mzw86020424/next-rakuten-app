require 'rails_helper'

RSpec.describe SamplesController do
  describe 'GET #index' do
    context 'sampleのデータが存在する場合' do
      let!(:sample_1) { Sample.create! }
      let!(:sample_2) { Sample.create! }
      let!(:sample_3) { Sample.create! }

      it 'Sampleテーブルの全てのレコードが取得できる' do
        get :index
        expect(response).to have_http_status(:success)
        expect(response.body).to include(sample_1.id.to_s, sample_2.id.to_s, sample_3.id.to_s)
      end
    end
  end
end
