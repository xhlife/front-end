
// 数据响应式原理
function observe(data) {
  if (!data || typeof data !== "object") return;

  for (var key in data) {
    let val = data[key];
    let sub = new Subject(); // 每一个数据都是订阅者

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,

      get: function () {
        console.log("get function in observer fun");
        console.log(val);
        if (currentObserver) {
          console.log("currentOb exist" + currentObserver);
          currentObserver.subscribeTo(sub);
        }
        return val;
      },

      set: function (newVal) {
        console.log("set function in observer fun");
        val = newVal;
        sub.notify();
      },
    });

    if (typeof val === "object") {
      observe(val);
    }
  }
}

let currentObserver = null;
let id = 0;

// 观察者模式
    // 被观察者（发布者）
class Subject {
  constructor() {
    this.id = id++;
    this.observers = [];
  }
  addObserver(observer) {
    console.log("addObserver fun in class subject");
    this.observers.push(observer);
  }

  removerObserver(observer) {
    console.log("removeOb fun in class subject");
    var index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify() {
    console.log("notify fun in class subject");
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
}
// 观察者（订阅者）
class Observer {
  constructor(vm, key, callback) {
    this.subjects = {};
    this.vm = vm;
    this.key = key;
    this.callback = callback;
    this.value = this.getValue();
  }

  getValue() {
    console.log("getValue fun in class observer");
    currentObserver = this;
    //     console.log('bug start, print vm,vm.data,key');
    //     console.log(this);
    //     console.log(this.vm);
    //     console.log(this.vm.$data);
    //     console.log(this.key);
    let value = this.vm.$data[this.key];
    currentObserver = null;
    return value;
  }

  update() {
    console.log("update fun in class observer");
    var oldVal = this.value;
    var newVal = this.getValue();
    if (oldVal !== newVal) {
      this.value = newVal;
      this.callback.bind(this.vm)(newVal, oldVal);
    }
  }

  subscribeTo(subject) {
    console.log("subscribeto fun in class observer");
    if (!this.subjects[subject.id]) {
      console.log("subscribe to... ", subject);
      subject.addObserver(this);
      this.subjects[subject.id] = subject;
    }
  }
}

class mvvm {
  constructor(opts) {
    this.init(opts);
    observe(this.$data);
    new Compile(this);
  }

  init(opts) {
    console.log("init fun in mvvm class");
    this.$ele = document.querySelector(opts.ele);
    this.$data = opts.data || {};
    this.methods = opts.methods || {};

    for (let key in this.methods) {
      this.methods[key] = this.methods[key].bind(this);
    }

    for (let key in this.$data) {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,

        get: () => {
          return this.$data[key];
        },

        set: (newVal) => {
          this.$data[key] = newVal;
        },
      });
    }
  }
}

class Compile {
  constructor(vm) {
    this.vm = vm;
    this.node = vm.$ele;
    this.compile();
  }

  compile() {
    console.log("compile fun in class Compile");
    this.traverse(this.node);
  }

  traverse(node) {
    console.log("traverse fun in class Compile");
    if (node.nodeType === 1) {
      this.compileNode(node);
      node.childNodes.forEach((childNode) => {
        this.traverse(childNode);
      });
    } else if (node.nodeType === 3) {
      this.renderText(node);
    }
  }

  // 处理节点
  compileNode(node) {
    let attrsArr = Array.from(node.attributes);
    attrsArr.forEach((attr) => {
      if (this.isModel(attr.name)) {
        this.bindModel(node, attr);
      } else if (this.isHandle(attr.name)) {
        this.bindHandle(node, attr);
      }
    });
  }
  // 处理指令
  bindModel(node, attr) {
    let key = attr.value;
    node.value = this.vm.$data[key];
    new Observer(this.vm, key, function (newVal) {
      node.value = newVal;
    });

    node.oninput = (e) => {
      this.vm.$data[key] = e.target.value;
    };
  }
  // 处理方法
  bindHandle(node, attr) {
    let startIndex = attr.name.indexOf(":") + 1;
    let endIndex = attr.name.length;
    let eventType = attr.name.substring(startIndex, attr.name.length);
    let method = attr.value;
    node.addEventListener(eventType, this.vm.methods[method]);
  }

  // 判断指令
  isModel(attrName) {
    return attrName === "v-model";
  }

  isHandle(attrName) {
    return attrName.indexOf("v-on") > -1;
  }

  // 渲染单变量
  renderText(node) {
    console.log("render fun in class Compile");
    let reg = /{{(.+?)}}/g;
    let match;
    while ((match = reg.exec(node.nodeValue))) {
      let raw = match[0];
      let key = match[1].trim();
      node.nodeValue = node.nodeValue.replace(raw, this.vm.$data[key]);
      new Observer(this.vm, key, function (newVal, oldVal) {
        node.nodeValue = node.nodeValue.replace(oldVal, newVal);
      });
    }
  }
}

let testMvvm = new mvvm({
  ele: "#app",

  data: {
    name: "fejavu",
    age: 23,
  },

  methods: {
    hello: function () {
      console.log("testmvvm start");
      console.log(this);
      console.log(this.vm);
      //       console.log(this)
      // alert("hello! " + this.name);
    },
  },
});