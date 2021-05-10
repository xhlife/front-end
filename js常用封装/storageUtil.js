let COOKEY_TIMEOUT = 10 //单位：天
export default {
  // localStorage 部分的封装
  // 如果不支持 localStorage那么采用cookie得方式
  setLocalItem(key, val) {
    if (window.localStorage) {
      let storage = window.localStorage
      storage.setItem(key, val)
    } else {
      this.setCookey(key, val, COOKEY_TIMEOUT)
    }
  },
  getLocalItem(key) {
    if (window.localStorage) {
      let storage = window.localStorage
      return storage.getItem(key)
    } else {
      return this.getCookey(key)
    }
  },
  removeLocalItem(key) {
    if (window.localStorage) {
      let storage = window.localStorage
      storage.removeItem(key)
    } else {
      this.removeCookey(key)
    }
  },
  // sessionStorage部分的封装
  // /如果不支持session，那么也将采用cookie方式存储
  setSessionItem(key, val) {
    if (window.sessionStorage) {
      let storage = window.sessionStorage
      storage.setItem(key, val)
    } else {
      this.setCookey(key, val, COOKEY_TIMEOUT)
    }
  },
  getSessionItem(key) {
    if (window.sessionStorage) {
      let storage = window.sessionStorage
      return storage.getItem(key)
    } else {
      return this.getCookey(key)
    }
  },
  removeSessionItem(key) {
    if (window.sessionStorage) {
      let storage = window.sessionStorage
      storage.removeItem(key)
    } else {
      this.removeCookey(key)
    }
  },
  // cookie部分的封装
  setCookie(key, val, days) {
    let exdate = new Date()
    exdate.setDate(exdate.getDate() + days)
    document.cookie =
      key + '=' + escape(val) + ';expires=' + exdate.toGMTString()
  },
  getCookie(key) {
    let key_start = document.cookie.indexOf(key + '=')
    if (key_start != -1) {
      key_start = key_start + key.length + 1
      let key_end = document.cookie.indexOf(';', key_start)
      if (key_end == -1) {
        key_end = document.cookie.length
      }
      return unescape(document.cookie.substring(key_start, key_end))
    } else {
      return ''
    }
  },
  removeCookie(key) {
    let val = this.getCookey(key)
    if (val) {
      let exdate = new Date()
      document.cookie =
        key + '=' + escape(val) + ';expires=' + exdate.toGMTString()
    }
  },
}
