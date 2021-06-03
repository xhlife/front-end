/* 
    自定义Promise模块
*/
(function (window) {
  // promise 接收执行器函数 excutor(同步执行)
  function Promise(excutor) {
      const _this = this;
    // 定义promise状态，和回调数组
    this.status = "pending";
    this.data = undefined;
    this.callBacks = []; // 存放指定回调函数，即then()的参数,包括 res=>{}，与err => {}
    // 因此采用数组的每一项都是对象{onResolved: res => {}, onReject: err => {}}
    
    // 定义用于改变Promsie状态的函数
    function resolve(value) {
      // 如果状态不是pending, 直接return ,因为状态只能改变一次
      if (_this.status !== "pending") {
        return;
      }
       _this.status = "resolved";
      _this.data = value;
      // 如果有待执行callback函数，立刻异步执行回调
      if (_this.callBacks.length > 0) {
        setTimeout(() => {
          _this.callBacks.forEach((callBackObj) => {
            callBackObj.onResolved(value);
          });
        });
      }
    }
    function reject(reason) {
      if (_this.status !== "pending") {
        return;
      }
      _this.status = "rejected";
      _this.data = reason;
      if (_this.callBacks.length > 0) {
        setTimeout(() => {
          _this.callBackObj.forEach((callBackObj) => {
            callBackObj.onRejected(reason);
          });
        });
      }
    }
    try {
      excutor(resolve, reject);
    } catch (error) {
      // 如果执行器出现异常，那么promise状态为rejected
      reject(error);
    }
  }
  // 指定成功/失败的回调，并返回一个Promise
  Promise.prototype.then = function (onResolved, onRejected) {
      const _this = this;
    // 当指定回调函数时，往callBack中存起来
    _this.callBacks.push({
      onResolved,
      onRejected,
    });
  };
  // 指定失败的回调，并返回一个promise
  Promise.prototype.catch = function (onRejected) {};
  // 返回一个指定成功的promise
  Promise.resolve = function (value) {};
  // 返回一个指定失败的promise
  Promise.reject = function (reason) {};
  // 返回一个promise,只有所有的promise成功才成功，一个失败则失败
  Promise.all = function (promises) {};
  // 返回一个promise,第一个成功的promise成功则成功
  Promise.race = function (promises) {};
  window.Promise = Promise;
})(window);

let p = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('2')
    }, 1000);
})
p.then(res => {
    console.log(res);
})
