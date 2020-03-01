require 'test_helper'

class TopicTest < ActiveSupport::TestCase
  def setup
    @user = users(:michael)
    # 这行代码不符合常见做法
    # @topic = Topic.new(content: "Lorem ipsum", user_id: @user.id)
    @topic = @user.topics.build(content: "Lorem ipsum")
  end
  test "should be valid" do
    assert @topic.valid?
  end
  test "user id should be present" do
    @topic.user_id = nil
    assert_not @topic.valid?
  end
  test "content should be present" do
    @topic.content = " "
    assert_not @topic.valid?
  end
  test "content should be at most 1000 characters" do
    @topic.content = "a" * 1001
    assert_not @topic.valid?
  end

  test "order should be most recent first" do
    assert_equal topics(:most_recent), Topic.first
  end
end
