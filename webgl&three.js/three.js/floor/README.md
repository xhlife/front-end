### 
```js
var a = new FloorSlab(scene,camera, renderer)
// 初始化画布
a.init()
// 添加画布点击事件
a.addClickEvent() 
// 生成多边形
a.createShape()
// 生成3d模型
a.createModel()
// 生成凸包
a.createHullShape()
// 生成最小矩形
a.drawMinRect(a.edgeList)
// 拆分
a.splitShape('long',4,5)
```

### 代码整理
 按照 mvc架构整理   进度 0%(目前没整理)