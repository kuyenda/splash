class DocumentsController < ApplicationController
  DOC_VERSION = "1.00"
  DOC_META = [
    ["naming", "question", "命名规则"],
    ["typography", "type", "段落"],
    ["color", "droplet-half", "颜色"],
    ["border", "app", "边框"],
    ["layout", "layers-half", "图层"],
    ["icon", "bootstrap-fill", "图标"],
    ["debugging", "terminal-fill", "调试"],
  ]
  def show
    @id = params[:id]
    @docs ||= []
    DOC_META.each do |item|
      @docs.push({ href: item[0], icon_name: item[1], text: item[2] })
    end
  end
end
