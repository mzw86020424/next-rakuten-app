class SamplesController < SecuredController
  skip_before_action :authorize_request

  def index
    render json: Sample.all
  end
end
