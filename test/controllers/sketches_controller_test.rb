require 'test_helper'

class SketchesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get sketches_url
    assert_response :success
  end

end
