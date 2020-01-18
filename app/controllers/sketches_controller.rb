class SketchesController < ApplicationController
  protect_from_forgery :except => [:save_code]

  layout false, only: [:new, :edit, :sandbox, :help]

  def help
    # respond_to do |format|
    #   format.html { render :layout => false }
    # end
  end

  def sandbox
    # render layout: false
  end

  def index
    @all = Sketch.all
    @sketch = Sketch.new
  end

  def new
    @sketch = Sketch.new
  end

  def create
    @sketch = Sketch.new(sketch_params)
    @sketch.digit = Sketch.sample_digit
    @sketch.view = 0
    @sketch.clap = 0
    if @sketch.save
      create_code_file(@sketch.digit)
      redirect_to @sketch
    else
      redirect_to sketches_url
    end
  end

  def show
    @sketch = Sketch.friendly.find(params[:id])
    if @sketch.view
      @sketch.update(view: @sketch.view + 1)
      @sketch.save
    end
    render layout: "auth"
  end

  def edit
    @sketch = Sketch.friendly.find(params[:id])
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
    delete_code_file(Sketch.friendly.find(params[:id]).digit)
    Sketch.friendly.find(params[:id]).destroy
    redirect_to sketches_url
  end

  def json
    @all = Sketch.all
    render json: @all
  end

  def save_code
    save_code_file(params[:digit], params[:code])
    redirect_to Sketch.friendly.find_by digit: params[:digit]
  end

  private
  def sketch_params
    params.require(:sketch).permit(:title, :description)
  end
  # save codes
  def code_path(*arg)
    File::join(Rails.root.to_s, "public", "sketches", arg, "")
  end
  def create_code_file(digit, format=".js")
    path = code_path "users"
    template_file = code_path + "sketch_template.js"
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
