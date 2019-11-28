class ExamplesController < ApplicationController
  protect_from_forgery :except => [:save_code]
  def index
    @example = Example.all
  end
  def example
    render layout: false
  end
  def help
  end
  def show
    @example = Example.find(params[:id])
    if @example.hit
      @example.update(hit: @example.hit + 1)
      @example.save
    end
  end
  def new
    @example = Example.new
  end
  def create
    @example = Example.new(example_params)
    @example.digit = Example.sample_digit;
    if @example.save
      create_code_file(@example.digit)
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
    delete_code_file(Example.find(params[:id]).digit)
    Example.find(params[:id]).destroy
    flash[:success] = "deleted"
    redirect_to examples_url
  end
  def data
    @example = Example.all
    render json: @example
  end
  def save_code
    save_code_file(params[:digit], params[:code])
    redirect_to Example.find_by digit: params[:digit]
  end
  private
  def example_params
    params.require(:example).permit(:title, :description, :like, :hit)
  end
  # save codes
  def code_directory
    File::join(Rails.root.to_s, "app", "assets", "examples", "users", "")
  end
  def create_code_file(digit)
    path = code_directory
    file_format = ".js"
    f = File.new(path + digit + file_format, "w+")
    f.puts("# Read the guide to start code")
    f.close
  end
  def save_code_file(digit, content)
    path = code_directory
    file_format = ".js"

    f = File.open(path + digit + file_format, "w")
    f.write(content)
    f.close
  end
  def delete_code_file(digit)
    full_path = code_directory + digit + ".js"
    if File::exist?(full_path)
      File.delete(full_path)
    end
  end
end
