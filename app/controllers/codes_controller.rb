class CodesController < ApplicationController
  before_action :verify_sketch

  def create
    @code = @sketch.codes.build(code_params)
    respond_to do |format|
      if @code.save
        format.html { redirect_to @sketch, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @code }
      else
        format.html { render :new }
        format.json { render json: @code.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @code = @sketch.codes.find(params[:id])
    @code.update_attributes(code_params)
  end

  def destroy
    @code = @sketch.codes.find(params[:id])
    @code.destroy
  end

  private
  def code_params
    params.require(:code).permit(:code)
  end
  # 对应草图的才能删除
  # 从会话中找到当前的草图ID
  def verify_sketch
    @sketch = Sketch.find(params[:sketch_id])
    return false if @sketch.nil?
  end
end
