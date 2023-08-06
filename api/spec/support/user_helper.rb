module UserHelper
  def create_test_user
    User.create!(sub: "sample_sub_#{SecureRandom.uuid}")
  end
end
