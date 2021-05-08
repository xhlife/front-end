export const webInPc = function () {
  let userAgent = navigator.userAgent.toLowerCase()
  let bIsIpad = userAgent.match(/ipad/i) == 'ipad'
  let bIsIphoneOs = userAgent.match(/iphone os/i) == 'iphone os'
  let bIsMidp = userAgent.match(/midp/i) == 'midp'
  let bIsUc7 =userAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
  let bIsUc = userAgent.match(/ucweb/i) == 'ucweb'
  let bIsAndroid = userAgent.match(/android/i) == 'android'
  let bIsCE = userAgent.match(/windows ce/i) == 'windows ce'
  let bIsWM = userAgent.match(/windows mobile/i) == 'windows mobile'
  if (
    bIsIpad ||
    bIsIphoneOs ||
    bIsMidp ||
    bIsUc7 ||
    bIsUc ||
    bIsAndroid ||
    bIsCE ||
    bIsWM
  ) {
    return 'mobile'
  } else {
    return 'pc'
  }
}
