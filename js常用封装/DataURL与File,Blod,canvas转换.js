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

// 1,把base64编码转为file
// 第一个参数dataUrl是一个base64的字符串。第二个参数是文件名可以随意命名
function base64toFile(dataurl, filename = 'file') {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    // suffix是该文件的后缀
    let suffix = mime.split('/')[1];
    // atob 对经过 base-64 编码的字符串进行解码
    let bstr = atob(arr[1]);
    // n 是解码后的长度
    let n = bstr.length;
    // Uint8Array 数组类型表示一个 8 位无符号整型数组 初始值都是 数子0
    let u8arr = new Uint8Array(n);
    // charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    // new File返回File对象 第一个参数是 ArraryBuffer 或 Bolb 或Arrary 第二个参数是文件名
    // 第三个参数是 要放到文件中的内容的 MIME 类型
    return new File([u8arr], `${filename}.${suffix}`, {
      type: mime,
    });
  }

  // 方式二 base
  //1,先将base64转换为blob
  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }
  //2,再将blob转换为file
  function blobToFile(theBlob, fileName){
     theBlob.lastModifiedDate = new Date();  // 文件最后的修改日期
     theBlob.name = fileName;                // 文件名
     return new File([theBlob], fileName, {type: theBlob.type, lastModified: Date.now()});
  }
