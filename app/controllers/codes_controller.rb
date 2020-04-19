class CodesController < ApplicationController
  def code_params
    params.require(:code).permit(:code)
  end
end
