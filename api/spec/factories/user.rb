FactoryBot.define do
  factory :user do
    sub { "sample_sub_#{SecureRandom.uuid}" }
  end
end
