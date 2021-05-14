const Ruler = {
  /**
   * @colNum 刻度尺列数，如果传递了列数 > 0 将按份数画，非传统标尺
   * @width 刻度尺宽度 Number
   * @height 刻度尺高度 Number
   * @startValue 开始的值 Number
   * @background 刻度尺背景颜色 String
   * @color 刻度线和字体的颜色 String
   * @markColor  中心刻度标记颜色 String
   * */
  initRow: function(params) {
    const initData = {
      colNum: params.colNum,
      width: params.width || 60,
      height: params.height || 60,
      startValue: params.startValue || 0,
      background: params.background || false,
      color: params.color || false,
      markColor: params.markColor || '#FFCC33',
      startGap: params.startGap || 0,
    }
    // 用份数画还是正常刻度尺
    const drawDetail = !initData.colNum
    const count = initData.startValue // 初始值
    const division = drawDetail
      ? 10
      : (initData.width - initData.startGap * 2) / initData.colNum // 每个刻度的距离 分割线
    const drawCount = initData.colNum || initData.width // 刻度数量

    let canvas = params.el || document.createElement('canvas') // 创建canvas标签
    canvas.width = initData.width
    canvas.height = initData.height
    const cxt = canvas.getContext('2d')
    if (window.devicePixelRatio) {
      canvas.width = window.devicePixelRatio * initData.width
      canvas.height = window.devicePixelRatio * initData.height
      cxt.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    // 画刻度尺
    function drawRuler(count) {
      // 清空画布
      cxt.clearRect(0, 0, initData.width, initData.height)
      // 刻度尺背景
      if (initData.background) {
        cxt.fillStyle = initData.background
        cxt.fillRect(0, 0, canvas.width, initData.height)
      }
      // 画刻度线
      for (let i = 0; i <= drawCount; i++) {
        cxt.beginPath()
        cxt.save()
        cxt.strokeStyle = initData.color ? initData.color : '#666'
        cxt.lineWidth = 1
        cxt.lineCap = 'round'
        const x = division * i - count * division + initData.startGap
        cxt.moveTo(x, initData.height)
        if (drawDetail) {
          if (i % 10 === 0) {
            cxt.font = '10px Arial'
            cxt.fillStyle = initData.color ? initData.color : '#333'
            cxt.textAlign = 'left'
            cxt.textBaseline = 'middle'
            cxt.lineTo(x, 0)
            cxt.fillText(
              String(i * division),
              x + 2,
              Math.floor(initData.height * 0.5)
            )
          } else if (i % 5 === 0) {
            cxt.lineTo(x, Math.floor(initData.height * 0.5))
          } else {
            cxt.strokeStyle = initData.color ? initData.color : '#bbb'
            cxt.lineTo(x, Math.floor(initData.height * 0.8))
          }
        } else {
          cxt.font = '10px Arial'
          cxt.fillStyle = initData.color ? initData.color : '#333'
          cxt.textAlign = 'left'
          cxt.textBaseline = 'middle'
          cxt.lineTo(x, 0)
          cxt.fillText(i, x + 2, Math.floor(initData.height * 0.5))
        }
        cxt.stroke()
        cxt.restore()
        cxt.closePath()
      }
      // 底部线条
      cxt.beginPath()
      cxt.save()
      cxt.strokeStyle = initData.color ? initData.color : '#bbb'
      cxt.lineWidth = 1
      cxt.lineCap = 'round'
      cxt.moveTo(0, initData.height - 1)
      cxt.lineTo(initData.width, initData.height - 1)
      cxt.stroke()
      cxt.restore()
      cxt.closePath()
    }
    if (window.devicePixelRatio) {
      canvas.style.transform = 'scale(' + 1 / window.devicePixelRatio + ')'
      canvas.style.transformOrigin = 'left top'
    }
    drawRuler(count)
    return canvas
  },
  initColumn: function(params) {
    const initData = {
      colNum: params.colNum,
      width: params.width || 60,
      height: params.height || 60,
      startValue: params.startValue || 0,
      background: params.background || false,
      color: params.color || false,
      markColor: params.markColor || '#FFCC33',
      startGap: params.startGap || 0,
    }
    const drawDetail = !initData.colNum
    const count = initData.startValue // 初始值
    const division = drawDetail
      ? 10
      : (initData.height - initData.startGap * 2) / initData.colNum // 每个刻度的距离 分割线
    const drawCount = initData.colNum || initData.height // 刻度数量

    let canvas = params.el || document.createElement('canvas') // 创建canvas标签
    canvas.width = initData.width
    canvas.height = initData.height
    const cxt = canvas.getContext('2d')
    if (window.devicePixelRatio) {
      canvas.width = window.devicePixelRatio * initData.width
      canvas.height = window.devicePixelRatio * initData.height
      cxt.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    // 画刻度尺
    function drawRuler(count) {
      // 清空画布
      cxt.clearRect(0, 0, initData.width, initData.height)
      // 刻度尺背景
      if (initData.background) {
        cxt.fillStyle = initData.background
        cxt.fillRect(0, 0, canvas.width, initData.height)
      }
      // 画刻度线
      for (let i = 0; i <= drawCount; i++) {
        cxt.beginPath()
        cxt.save()
        cxt.strokeStyle = initData.color ? initData.color : '#666'
        cxt.lineWidth = 1
        cxt.lineCap = 'round'
        const y = division * i - count * division + initData.startGap
        cxt.moveTo(initData.width, y)
        if (drawDetail) {
          if (i % 10 === 0) {
            cxt.font = '10px Arial'
            cxt.fillStyle = initData.color ? initData.color : '#333'
            cxt.textAlign = 'left'
            cxt.textBaseline = 'middle'
            cxt.lineTo(0, y)
            cxt.fillText(String(i * division), 0, y + 8)
          } else if (i % 5 === 0) {
            cxt.lineTo(Math.floor(initData.width * 0.5), y)
          } else {
            cxt.strokeStyle = initData.color ? initData.color : '#bbb'
            cxt.lineTo(Math.floor(initData.width * 0.8), y)
          }
        } else {
          cxt.font = '10px Arial'
          cxt.fillStyle = initData.color ? initData.color : '#333'
          cxt.textAlign = 'left'
          cxt.textBaseline = 'middle'
          cxt.lineTo(0, y)
          cxt.fillText(i, 1, y + 8)
        }
        cxt.stroke()
        cxt.restore()
        cxt.closePath()
      }
      cxt.beginPath()
      cxt.save()
      cxt.strokeStyle = initData.color ? initData.color : '#bbb'
      cxt.lineWidth = 1
      cxt.lineCap = 'round'
      cxt.moveTo(initData.width - 1, 0)
      cxt.lineTo(initData.width - 1, initData.height)
      cxt.stroke()
      cxt.restore()
      cxt.closePath()
    }
    if (window.devicePixelRatio) {
      canvas.style.transform = 'scale(' + 1 / window.devicePixelRatio + ')'
      canvas.style.transformOrigin = 'left top'
    }
    drawRuler(count)
    // 最后将canvas节点返回
    return canvas
  },
}
export default Ruler