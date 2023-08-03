class SlackClient
  def initialize(channel)
    @client = Slack::Notifier.new(
      ENV.fetch('SLACK_WEBHOOK_URL'),
      channel: channel,
      username: ENV.fetch('SLACK_USERNAME')
    )
  end

  def notify(title, message)
    @client.post(text: title, attachments: [{ text: message }])
  end
end
