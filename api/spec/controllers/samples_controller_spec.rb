require 'rails_helper'

RSpec.describe SamplesController do
  describe 'GET #index' do
    context 'sampleのデータが存在する場合' do
      # rubocop:disable RSpec/IndexedLet
      let!(:sample1) { Sample.create! }
      let!(:sample2) { Sample.create! }
      let!(:sample3) { Sample.create! }
      # rubocop:enable RSpec/IndexedLet

      # rubocop:disable RSpec/MultipleExpectations
      it 'Sampleテーブルの全てのレコードが取得できる' do
        get :index
        expect(response).to have_http_status(:success)
        expect(response.body).to include(sample1.id.to_s, sample2.id.to_s, sample3.id.to_s)
      end
      # rubocop:enable RSpec/MultipleExpectations
    end
  end
end
