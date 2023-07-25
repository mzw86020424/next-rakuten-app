class ApplicationController < ActionController::API
  rescue_from StandardError, with: :render_and_notify_500

  private

  def render_and_notify_500(e)
    render json: { error: e }, status: :internal_server_error
    SlackClient.new('システムエラー通知').notify('500エラー', "#{e.message}\n#{e.backtrace.join("\n")}")
  end
end
