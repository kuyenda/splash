class TopicsController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]

  def index
  end

  def create
    @topic = current_user.topics.build(topic_params)
    if @topic.save
      flash[:success] = "已发布"
      redirect_to current_user
    else
      flash[:danger] = "话题内容不能为空"
      redirect_to current_user
    end
  end

  def destroy
  end

  private
  def topic_params
    params.require(:topic).permit(:content)
  end
end
