module Api
  module V1
    class NicodousController < ApplicationController
      def index
        nicodou_client = NicodouClient.new

        nicodous = nicodou_client.search_videos(params)

        render json: nicodous, status: :ok
      end
    end
  end
end
