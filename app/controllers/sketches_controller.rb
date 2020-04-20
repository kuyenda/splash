class SketchesController < ApplicationController
  layout false, only: [:create]

  def sandbox
    render html: "".html_safe
  end
  #
  def index
    @sketches = Sketch.all.order(created_at: :desc)
    # 获取字符串查询数据
    @query = params["q"]
    # 寻找关键词
    if @query.present?
      keyword = @query["keyword"]
      unless keyword.blank?
        @sketches = Sketch.where("#{@query["by"]} LIKE ?", "%#{keyword}%")
      end
    end
    # 处理分页
    @sketches = @sketches.paginate(page: params[:page], per_page: 10)
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @sketches}
    end
    # @sketches = Sketch.ransack(params[:q]).result(distinct: true)
  end

  def create
    @sketch = Sketch.new(sketch_params)
    @sketch.digest = Sketch.create_digests
    if @sketch.save
      redirect_to @sketch
    else
      redirect_to @sketch
    end
  end

  def show
    @sketch = Sketch.friendly.find(params[:id])
    respond_to do |format|
      format.html { render layout: "blank" } # show.html.erb
      format.json { render json: @sketch}
    end
  end

  def update
    @sketch = Sketch.friendly.find(params[:id])
    if @sketch.update_attributes(sketch_params)
      # 处理更新成功的情况
      redirect_to @sketch
    else
      render 'edit'
    end
  end

  def destroy
    Sketch.friendly.find(params[:id]).destroy
    redirect_to sketches_url
  end

  private
  def sketch_params
    params.require(:sketch).permit(:title, :description)
  end
end
