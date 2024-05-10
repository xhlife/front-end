function timeout(wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
}

class SuperTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount; // 并发数量
    this.tasks = []; // 当前任务队列
    this.runningCount = 0; // 正在执行的任务
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve, // 保存 resolve 和 reject
        reject
      })
      this._run() // 触发任务执行，因为一开始任务队列可能是空的
    })
  }
  // 执行任务
  _run() {
    // 当前正在执行的任务数小于并发数量， 而且任务队列不为空的情况
    while(this.runningCount < this.parallelCount && this.tasks.length > 0) {
      const {task, resolve, reject} = this.tasks.shift()
      this.runningCount++
      task().then(resolve, reject).finally(() => {
        this.runningCount--;
        this._run()
      })
    }
  }
}

const superTask = new SuperTask();

function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}

addTask(10000, 1);
addTask(5000, 2);
addTask(3000, 3);
addTask(4000, 4);
addTask(5000, 5);
