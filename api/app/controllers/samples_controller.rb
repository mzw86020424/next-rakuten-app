class SamplesController < ApplicationController
  def index
    render json: Sample.all
  end
end
