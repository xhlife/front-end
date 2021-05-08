export const browserType = function () {
  if (
    navigator.userAgent.indexOf('MSIE') >= 0 &&
    navigator.userAgent.indexOf('Opera') < 0
  ) {
    if (
      navigator.appName == 'Microsoft Internet Explorer' &&
      navigator.appVersion.split(';')[1].replace(/[ ]/g, '') == 'MSIE6.0'
    ) {
      return 'IE 6.0'
    } else if (
      navigator.appName == 'Microsoft Internet Explorer' &&
      navigator.appVersion.split(';')[1].replace(/[ ]/g, '') == 'MSIE7.0'
    ) {
      return 'IE 7.0'
    } else if (
      navigator.appName == 'Microsoft Internet Explorer' &&
      navigator.appVersion.split(';')[1].replace(/[ ]/g, '') == 'MSIE8.0'
    ) {
      return 'IE 8.0'
    } else if (
      navigator.appName == 'Microsoft Internet Explorer' &&
      navigator.appVersion.split(';')[1].replace(/[ ]/g, '') == 'MSIE9.0'
    ) {
      return 'IE 9.0'
    } else {
      return 'IE 10.0'
    }
  } else if (
    Object.hasOwnProperty.call(window, 'ActiveXObject') &&
    !window.ActiveXObject
  ) {
    return 'IE 11.0'
  } else if (navigator.userAgent.indexOf('Firefox') >= 0) {
    return 'Firefox'
  } else if (navigator.userAgent.indexOf('Opera') >= 0) {
    return 'Opera'
  } else if (
    navigator.userAgent.indexOf('Safari') > -1 &&
    navigator.userAgent.indexOf('Chrome') == -1
  ) {
    return 'Safari'
  } else if (
    navigator.userAgent.indexOf('Chrome') > -1 &&
    navigator.userAgent.indexOf('Safari') > -1
  ) {
    return 'Chrome'
  } else if (navigator.userAgent.indexOf('Netscape') >= 0) {
    return 'Netscape'
  } else {
    return ''
  }
}

