class ExamplesController < ApplicationController
  def index
    @example = Example.all
  end
  def example
    render layout: false
  end
  def show
    @example = Example.find(params[:id])
  end
  def new
    @example = Example.new
  end
  def create
    @example = Example.new(example_params)
    if @example.save
      flash[:success] = "Welcome to the Sample App!"
    else
      render 'new'
    end
  end
  def edit
    @example = Example.find(params[:id])
  end
  def update
    @example = Example.find(params[:id])
    if @example.update_attributes(user_params)
      # 处理更新成功的情况
      flash[:success] = "updated"
      redirect_to @example
    else
      render 'edit'
    end
  end
  private
  def example_params
    params.require(:example).permit(:title, :url)
  end
end
