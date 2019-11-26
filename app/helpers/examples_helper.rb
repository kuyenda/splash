module ExamplesHelper
  def rand_hex_color
    '#' << SecureRandom.hex(3)
  end
  def reverse_hex_color(color)
    rgb = color[1..-1].hex
    r = rgb >> 16
    g = (rgb & 65280) >> 8
    b = rgb & 255
    brightness = r*0.299 + g*0.587 + b*0.114
    return (brightness > 160) ? "#000" : "#fff"
  end
end
