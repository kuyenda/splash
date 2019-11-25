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
      redirect_to @example
    else
      render 'new'
    end
  end
  def edit
    @example = Example.find(params[:id])
  end
  def update
    @example = Example.find(params[:id])
    if @example.update_attributes(example_params)
      # 处理更新成功的情况
      flash[:success] = "updated"
      redirect_to @example
    else
      render 'edit'
    end
  end
  def destroy
    Example.find(params[:id]).destroy
    flash[:success] = "deleted"
    redirect_to examples_url
  end
  def data
    @example = Example.all
    render json: @example
  end
  private
  def example_params
    params.require(:example).permit(:title, :url)
  end
end
