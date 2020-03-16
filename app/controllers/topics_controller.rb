class TopicsController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]
  before_action :correct_user, only: :destroy

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
    @topic.destroy
    flash[:success] = "话题已删除"
    redirect_to request.referrer || root_url
  end

  private
  def topic_params
    params.require(:topic).permit(:content)
  end
  # 登入正确的用户才能删除
  def correct_user
    @topic = current_user.topics.find_by(id: params[:id])
    redirect_to root_url if @topic.nil?
    # redirect_back(fallback_location: root_url)
  end
end
