// 设计稿以 750px为基准

// rpx 转换为 px ，传参类型是数字（Number）
 
export function rpxTopx(rpx) {
 
  let deviceWidth = wx.getSystemInfoSync().windowWidth; //获取设备屏幕宽度
 
  let px = (deviceWidth / 750) * Number(rpx)
 
  return Math.floor(px);
 
}

// px 转换为 rpx ，传参类型是数字（Number）
 
export function pxTopx(px) {
 
  let deviceWidth = wx.getSystemInfoSync().windowWidth; //获取设备屏幕宽度
 
  let rpx = (750 / deviceWidth) * Number(px)
 
  return Math.floor(rpx);
 
}
