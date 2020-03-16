module SketchesHelper
  def chart_for(data)
    line_chart [
      { name: 'create', data: data.group_by_day(:created_at).count, color: '#FC427B'},
      { name: 'update', data: data.group_by_day(:updated_at).count, color: '#182C61'}
    ],
      # download: true,
    dataset: {
      borderWidth: 2
    },
    library: {
      responsive: true,
      cutoutPercentage: 50,
      title: {
        display: true,
        text: 'activity'
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
    }
    # xtitle: "日期", ytitle: "活跃",
    # height: "300px",
  end
  def string_color(t="helloworld")
    color = Digest::MD5.hexdigest(t)[0..5]
  end
end
