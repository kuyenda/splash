class ExamplesController < ApplicationController
  protect_from_forgery :except => [:save_code]
  layout "auth", only: [:show]
  def index
    @example = Example.all
  end

  def help
  end

  def show
    @example = Example.friendly.find(params[:id])
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
    @example.digit = Example.sample_digit
    if @example.save
      create_code_file(@example.digit)
      flash[:success] = "Welcome to the Untitled Page!"
      redirect_to @example
    else
      render 'new'
    end
  end

  def edit
    @example = Example.friendly.find(params[:id])
  end

  def update
    @example = Example.friendly.find(params[:id])
    if @example.update_attributes(example_params)
      # 处理更新成功的情况
      flash[:success] = "updated"
      redirect_to @example
    else
      render 'edit'
    end
  end

  def destroy
    delete_code_file(Example.friendly.find(params[:id]).digit)
    Example.friendly.find(params[:id]).destroy
    flash[:success] = "deleted"
    redirect_to examples_url
  end


  def example
    render layout: false
  end

  def data
    @example = Example.all
    render json: @example
  end

  def save_code
    save_code_file(params[:digit], params[:code])
    redirect_to Example.friendly.find_by digit: params[:digit]
    flash[:success] = "saved"
  end

  private
  def example_params
    params.require(:example).permit(:title, :description, :like, :hit)
  end
  # save codes
  def code_path(*arg)
    File::join(Rails.root.to_s, "public", "examples", arg, "")
  end
  def create_code_file(digit, format=".js")
    path = code_path "users"
    template_file = code_path + "example_template.js"
    f = File.new(path + digit + format, "w+")
    f.puts(File.read(template_file))
    f.close
  end
  def save_code_file(digit, content, format=".js")
    path = code_path "users"
    f = File.open(path + digit + format, "wb")
    f.write(content)
    f.close
  end
  def delete_code_file(digit, format=".js")
    path = code_path("users") + digit + format
    if File::exist?(path)
      File.delete(path)
    end
  end
end
