module Api
  module V1
    class NicodousController < ApplicationController
      def index
        nicodou_client = NicodouClient.new

        nicodous = nicodou_client.search_videos(params[:keyword])

        render json: nicodous, status: :ok
      end

      private

      def nicodou_params
        params.require(:nicodou).permit(:keyword)
      end
    end
  end
end
