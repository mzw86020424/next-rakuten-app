module Api
  module V1
    class NicodousController < ApplicationController
      skip_before_action :authorize_request, only: [:index]

      def index
        nicodou_client = NicodouClient.new

        nicodou_client.search_videos(params[:keyword])

        render json: nicdous, status: :ok
      end

      private

      def nicodou_params
        params.require(:nicodou).permit(:keyword)
      end
    end
  end
end
