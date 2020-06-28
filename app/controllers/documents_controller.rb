class DocumentsController < ApplicationController
  def show
    redirect_to document_url('color') if params[:id].nil?
    @id = params[:id]
  end
end
