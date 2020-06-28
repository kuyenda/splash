module ApplicationHelper
  # 根据所在的页面返回完整的标题
  def title(page_title = '')
    title = "MappingGraphics"
    return page_title.empty? ? title : page_title
  end

  # 显示导航和页尾
  def show_header
    @show_header ||= true
  end

  def show_footer
    @show_footer ||= true
  end

  # 渲染模型验证的错误
  def error_tag(target= nil, options= {}, &block)
    options[:class] ||= "alert alert-info"
    render partial: 'shared/form_error', locals: { object: target, options: options} if target
  end
end
