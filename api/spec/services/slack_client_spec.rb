require 'rails_helper'

RSpec.describe SlackClient do
  describe '#notify' do
    subject(:notify) { described_class.new('channel').notify(title, message) }

    let(:notifier_double) { instance_double(Slack::Notifier) }
    let(:title) { 'title' }
    let(:message) { 'message' }

    before do
      allow(Slack::Notifier).to receive(:new).and_return(notifier_double)
      allow(notifier_double).to receive(:post)
    end

    it 'Slack::Notifierインスタンスのpostメソッドが想定通りの引数で呼び出されること' do
      notify
      expect(notifier_double).to have_received(:post).with(
        text: title,
        attachments: [{ text: message }]
      )
    end
  end
end
