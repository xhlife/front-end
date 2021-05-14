const hexToRgba = function(color,opacity = 1){
  let upColor = color.toUpperCase()
  // 十六进制颜色值
  let reg = /^#[0-9a-fA-F]{3}|[0-9a-fA-F]{6}/

  if(upColor && reg.test(upColor)){
    // 将三位转为6位  #fff -> #FFFFFF
    if(upColor.length === 4){
      let newColor = "#"
      for(let i = 1; i < 4; i++){
        newColor += upColor.slice(i, i+1).concat(upColor.slice(i, i+1))
      }
      upColor = newColor
    }
    // 转化为rgba值
    const colorChange = []
    for(let i =1; i<7;i+=2/* 每一次截取两位 */){
      colorChange.push(parseInt('0x' + upColor.slice(i,i+2)))
    }
    return `rgba(${colorChange.join(',')},${opacity})`
  }
  return upColor
}