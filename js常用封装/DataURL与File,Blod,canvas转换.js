// canvas 转为dataURL
export const CanvasToDataURL = (canvas, type = 'image/png', quality = 1) => {
  return canvas.ToDataURL(type, quality);
};

// File对象转为dataURL、Blob对象转为 dataURL
// File对象也是一个Blob对象
export const blodToDataURL = (bolb, cb) => {
  let b = new FileReader();
  b.onload = function (e) {
    // 读取完成后，作为回调函数返回
    cb(e.target.result);
  };
  b.readAsDataURL(bolb);
};

// dataURL转换为Blob对象、dataURL转换为File对象
//File继承于Blob，扩展了一些属性（文件名、修改时间、路径等）。绝大多数场景下，使用Blob对象就可以了。
//兼容性：Edge浏览器不支持File对象构造函数，也就是Edge里不能new File()。

export const dataURLToBolb = (dataurl) => {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const dataURLToFile = (dataurl) => {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
// dataURL图片数据绘制到canvas 
export const dataURLToCAnvas = (dataUrl,canvas) => {
  let img = new Image();
  img.onload = function(){
    canvas.drawImage(img)
  }
  img.url = dataUrl;
}

// file、bolb转canvas 则先转dataurl 然后转 dataurl转canvas