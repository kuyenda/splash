module SketchesHelper
  def pie_by_week
    pie_chart Sketch.group_by_week(:created_at).count,
      donut: true,
      xtitle: "date", ytitle: "counts",
      height: "300px",
      colors: ["#2f8a38", "#8a472f", "#8a2f58"],
      dataset: { borderWidth: 1 },
      library: { cutoutPercentage: 50 }
  end
end
