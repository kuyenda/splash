class CodesController < ApplicationController
  def create
  end

  def destroy
  end

  def update
  end

  private
  # 对应草图的才能删除
  def code_params
    params.require(:code).permit(:code)
  end
end
