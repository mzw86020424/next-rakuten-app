module Api
  module V1
    class NicodousController < ApplicationController
      def index
        nicdous = Nicodou.order('created_at DESC')
        render json: nicdous, status: :ok
      end
    end
  end
end
