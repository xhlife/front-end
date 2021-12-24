
function countPromise() {
  return new Promise(async (resolve, reject) => {
    let flag = 0;
    const doSomeThing = () => {
      return new Promise((resolveInner, rejectInner) => {
        let ramdom = parseInt(Math.random() * 1000);
        if (ramdom % 2 === 0) {
          resolveInner(ramdom);
        } else {
          resolveInner(false);
        }
      });
    };
    let res = false;
    while (!res && flag < 5) {
      res = await doSomeThing();
      console.log(flag, res);
      flag += 1;
      if (res) {
        resolve(res);
        break;
      }
    }
    if (!res) {
      reject(res);
    }
  });
}
export default {};