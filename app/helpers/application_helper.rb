module ApplicationHelper
  # 根据所在的页面返回完整的标题
  def full_title(page_title = '')
    title = "Splash"
    return page_title.empty? ? title : page_title
  end
  # 渲染来自控制器的消息
  def flash_message(options= {}, &block)
    render partial: 'shared/flash'
  end
  # 渲染模型验证的错误
  def flash_form_error(target= nil, options= {}, &block)
    options[:class] ||= "alert alert-form"
    render partial: 'shared/flash_form_errors', locals: { object: target, options: options} if target
  end
end
