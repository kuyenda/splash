class DocumentsController < ApplicationController
  DOC_VERSION = "1.00"
  DOC_MAP = {
    "总览": [
      { href: "naming", text: "命名规则", icon: "question" },
      { href: "selector", text: "选择器的区别", icon: nil },
    ],
    "其他": [
      { href: "typography", text: "段落", icon: "type" },
      { href: "color", text: "颜色", icon: "droplet-half" },
      { href: "border", text: "边框", icon: "app" },
      { href: "layout", text: "图层", icon: "layers-half" },
      { href: "icon", text: "图标", icon: "bootstrap-fill" },
      { href: "debug", text: "调试", icon: "terminal-fill" },
    ]
  }

  def show
    @id = params[:id]
    @docs ||= DOC_MAP.values.flatten
  end
end
