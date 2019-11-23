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
      render plain: params[:article].inspect
      redirect_to @example
    else
      render 'new'
    end
  end
  private
  def example_params
    params.require(:example).permit(:title, :url)
  end
end
