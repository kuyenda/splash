require 'test_helper'

class TopicsInterfaceTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:michael)
  end
  test "topic interface" do
    log_in_as(@user)
    get user_path(@user)
    assert_select 'div.pagination'
    # 无效提交
    assert_no_difference 'Topic.count' do
      post topics_path, params: { topic: { content: "" } }
    end
    # assert_select 'div.alert alert-danger'
    # 有效提交
    content = "This topic really ties the room together"
    assert_difference 'Topic.count', 1 do
      post topics_path, params: { topic: { content: content } }
    end
    assert_redirected_to user_url(@user)
    follow_redirect!
    assert_match content, response.body
    # 删除一篇微博
    assert_select 'a', text: '删除'
    first_topic = @user.topics.paginate(page: 1).first
    assert_difference 'Topic.count', -1 do
      delete topic_path(first_topic)
    end
    # 访问另一个用户的资料页面（没有删除链接）
    get user_path(users(:archer))
    assert_select 'a', text: '删除', count: 0
  end
end
