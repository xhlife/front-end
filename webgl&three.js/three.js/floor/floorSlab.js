class FloorSlab {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.canvas = renderer.domElement;
    this.pointList = []; // 点击的点的集合
    this.edgeList = []; // 凸包点集合
    this.minRect = {}; // 最小外接矩形
    this.splitLine = []; // 分割线集合
    this.crossPointList = [];  // 相交点集合
    this.gap = 0; // 切割间隙
    this.raycaster = new THREE.Raycaster();
  }
  // 初始化，画板的点击事件
  init() {
    this.addPlane();
    this._drawPoint = this.drawPoint.bind(this);
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  // 添加一个平面
  addPlane() {
    var planeDom = this.canvas;
    var geometry = new THREE.PlaneGeometry(
      planeDom.offsetWidth,
      planeDom.offsetHeight,
      1
    );
    var material = new THREE.MeshBasicMaterial({
      color: "skyblue",
      side: THREE.DoubleSide,
    });
    var plane = new THREE.Mesh(geometry, material);
    this.scene.add(plane);
    this.render()
  }
  // 收集点击的点坐标（x,y,10）
  collectPoint(p) {
    var point = { x: p.point.x, y: p.point.y };
    this.pointList.push(point);
    return this.pointList;
  }
  // 鼠标点击描点
  drawPoint(e) {
    var mouse = new THREE.Vector2();
    mouse.x =
      ((e.clientX - e.target.offsetLeft) /
        this.renderer.domElement.clientWidth) *
        2 -
      1;
    mouse.y =
      -(
        (e.clientY - e.target.offsetTop) /
        this.renderer.domElement.clientHeight
      ) *
        2 +
      1;
    this.raycaster.setFromCamera(mouse, camera);
    var intersects = this.raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      this.collectPoint(intersect);
      var pointer = { x: intersect.point.x, y: intersect.point.y };
      var geometry = new THREE.BufferGeometry();
      var vertices = new Float32Array([pointer.x, pointer.y, 0]);
      var attribue = new THREE.BufferAttribute(vertices, 3);
      geometry.attributes.position = attribue;
      var material = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 5.0, //点对象像素尺寸
      }); //材质对象
      var points = new THREE.Points(geometry, material); //点模型对象
      this.scene.add(points);
      this.render()
    }
  }
  // 生成轮廓
  createShape() {
    var points = [];
    for (var item of this.pointList) {
      points.push(new THREE.Vector2(item.x, item.y));
    }
    var shape = new THREE.Shape(points);
    var material = new THREE.MeshBasicMaterial({
      color: 0x3300ff,
    });
    var geometry = new THREE.ShapeGeometry(shape, 25);
    var mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
    this.render();
    this._shape = shape;
    this._shapeMaterial = material;
    this._shapeMesh = mesh;
    // 生成凸包点集合
    this.createHullShapePoint();
    // this.pointList = [];
  }
  // 生成凸包
  createHullShape() {
    const points = [];
    for (var item of this.edgeList) {
      points.push(new THREE.Vector3(item.x, item.y, 0));
    }
    const material = new THREE.LineBasicMaterial({
      color: "yellow",
    });
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.LineLoop(geometry, material);
    this.scene.add(line);
    this.render();
  }
  // 拉伸轮廓模型
  createModel(depth) {
    const points = this.scene.children.filter((item) => item.type === "Points");
    points.push(this._shapeMesh);
    this.scene.remove(...points);
    var geometry = new THREE.ExtrudeGeometry(this._shape, {
      depth: depth || 50, //拉伸长度
      bevelEnabled: false, //无倒角
    });
    var mesh = new THREE.Mesh(geometry, this._shapeMaterial);
    this.scene.add(mesh);
    this.render();
  }
  // 监听点击事件
  addClickEvent() {
    this.canvas.addEventListener("click", this._drawPoint);
  }
  // 取消点击事件
  cancelClickEvent() {
    this.canvas.removeEventListener("click", this._drawPoint);
  }
  // 凸包计算
  createHullShapePoint() {
    this.edgeList = [];
    var ltl = this.LTL();
    var k = ltl;
    var arr = this.pointList;
    var pointLen = arr.length;
    do {
      this.edgeList.push(arr[k]);
      var s = -1;
      for (var t = 0; t < pointLen; t++) {
        if (
          t != k &&
          t != s &&
          (s == -1 || !this.toLeft(arr[k], arr[s], arr[t]))
        ) {
          s = t;
        }
      }
      k = s;
      var tmp = this.edgeList[this.edgeList.length - 1];
      if (!tmp.x == arr[k].x && !tmp.y == arr[k].y) {
        this.edgeList.push(arr[k]);
      }
    } while (ltl != k);
    return this.edgeList;
  }
  // 往左还是右
  toLeft(p, q, s) {
    return (
      p.x * q.y - p.y * q.x + q.x * s.y - q.y * s.x + s.x * p.y - s.y * p.x > 0
    );
  }
  // 检测边缘
  checkEdge(p, q, n) {
    var L,
      R = true;
    for (var i = 0; i < n && (L || R); i++) {
      if (i != p && i != q) {
        this.toLeft(this.pointList[p], this.pointList[q], this.pointList[i])
          ? (L = false)
          : (R = false);
      }
    }
    if (L || R) {
      this.pointList[p].extrme = this.pointList[q].extrme = true;
    }
  }
  // 寻找最小的 y 轴坐标
  LTL() {
    var arr = this.pointList;
    var min = arr[0];
    var minNum = 0;
    var len = arr.length;
    for (var i = 1; i < len; i++) {
      if (min.y <= arr[i].y) {
        min = arr[i];
        minNum = i;
      }
    }
    return minNum;
  }
  // 凸包中心点计算
  getHullCenter(list) {
    const result = list.reduce(
      (prev, next) => {
        return {
          x: +prev.x + +next.x,
          y: +prev.y + +next.y,
        };
      },
      {
        x: "",
        y: "",
      }
    );
    const center = {
      x: result.x / list.length,
      y: result.y / list.length,
    };
    return center;
  }
  // 旋转多边形，针对每个点实现绕中心点旋转
  pointRotate(point, centerPoint, angle) {
    var x1 = point.x;
    var y1 = point.y;
    var x0 = centerPoint.x;
    var y0 = centerPoint.y;
    var Q = (angle / 180) * 3.14115926;
    var x2, y2;
    x2 = (x1 - x0) * Math.cos(Q) - (y1 - y0) * Math.sin(Q) + x0; //旋转公式
    y2 = (x1 - x0) * Math.sin(Q) + (y1 - y0) * Math.cos(Q) + y0;
    return {
      x: x2,
      y: y2,
    };
  }
  // 简单外接矩形
  findEasyRect(hullList) {
    var len = hullList.length;
    if (!len) return false;
    var Xmax = hullList[0].x;
    var Ymax = hullList[0].y;
    var Xmin = 60000000; //最小值不能初始为0，
    var Ymin = 1000000000; //最小值不能初始为0，
    for (let item of hullList) {
      var tempx = item.x;
      var tempy = item.y;
      if (tempx >= Xmax) Xmax = tempx; //最大x，
      if (tempy >= Ymax) Ymax = tempy; //最大y，
      if (tempx <= Xmin) Xmin = tempx; //最小x
      if (tempy <= Ymin) Ymin = tempy; //最小y
    }
    var p1 = { x: Xmax, y: Ymax }; //左上
    var p2 = { x: Xmax, y: Ymin };
    var p3 = { x: Xmin, y: Ymin };
    var p4 = { x: Xmin, y: Ymax };
    var rectanglePoint = [p1, p2, p3, p4];
    return rectanglePoint;
  }
  // 存储每个旋转角度下多边形的外接矩形，记录外接矩形的顶点坐标、面积和此时多边形的旋转角度
  getRotateRectDatas(newHullList, angle) {
    const center = this.getHullCenter(newHullList);
    const list = []; // 收集旋转后的凸包点
    for (var item of newHullList) {
      var tmp = this.pointRotate(item, center, angle);
      list.push(tmp);
    }
    const rectPoint = this.findEasyRect(list);
    var deltaX, deltaY;
    deltaX = rectPoint[0].x - rectPoint[2].x;
    deltaY = rectPoint[0].y - rectPoint[2].y;
    return {
      area: Math.abs(deltaY * deltaX),
      angle,
      center,
      boundary: rectPoint,
    };
  }
  // 获取所有的矩形
  getAllNewRectDatas(hullList) {
    var rectList = [];
    for (var angle = 0; angle <= 90; ) {
      rectList.push(this.getRotateRectDatas(hullList, angle));
      angle += 0.5;
    }
    return rectList;
  }
  // 画最小矩形
  drawMinRect(hullList) {
    if (!hullList || hullList.length < 2) return false;
    // 获取所有矩形的列表
    const rects = this.getAllNewRectDatas(hullList);
    const rect = this.getMinRect(rects);
    const material = new THREE.LineBasicMaterial({
      color: "purple",
    });
    const points = [];
    for (var item of rect.boundary) {
      points.push(new THREE.Vector3(item.x, item.y, 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.LineLoop(geometry, material);
    this.scene.add(line);
    this.minRect = rect;
    this.render();
  }
  getMinRect(rectList) {
    var minArea = 100000000;
    var N = 0;
    for (let i = 0; i < rectList.length; i++) {
      if (minArea > rectList[i].area) {
        minArea = rectList[i].area;
        N = i;
      }
    }
    // 旋转到最小面积的方向
    var polygon = rectList[N];
    var boundary = [];
    polygon.boundary.forEach((item) => {
      var pt = this.pointRotate(item, polygon.center, -polygon.angle);
      boundary.push(pt);
    });
    var outpolygon = {
      center: polygon.center,
      area: polygon.area,
      angle: polygon.angle,
      boundary,
    };
    return outpolygon;
  }
  // 拆分
  splitShape(direction = "long", count = 4, gap = 0) {
    this.gap = gap;
    let minRectPoint = this.minRect.boundary;
    let rectInfo = this.widthAndHeightOfRect(minRectPoint);
    let linePoint, baseLine;
    if (direction == "long") {
      linePoint = rectInfo.shortPoint;
      baseLine = rectInfo.long;
    } else {
      baseLine = rectInfo.short;
      linePoint = rectInfo.longPoint;
    }
    linePoint = JSON.parse(JSON.stringify(linePoint));
    if (gap * count - 1 > baseLine) return false;
    let tanA = this.kOfLine(linePoint[0], linePoint[1]);
    let everyWidth = (baseLine - gap * (count - 1)) / count;
    let Y = everyWidth / Math.sqrt(1 + tanA * tanA);
    let X = Math.abs(Y * tanA);
    let isLarge = linePoint[0].y > linePoint[1].y;
    while (count > 1) {
      const material = new THREE.LineBasicMaterial({
        color: "red",
      });
      const points = [];
      for (var item of linePoint) {
        let x = item.x - X;
        let y = item.y + (isLarge ? Y : -Y);
        points.push(new THREE.Vector3(x, y, 0));
        item.x = x;
        item.y = y;
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      this.splitLine.push(points);
      const line = new THREE.Line(geometry, material);
      this.scene.add(line);
      if (gap > 0) {
        const pointsIn = [];
        let YInner = gap / Math.sqrt(1 + tanA * tanA);
        let XInner = Math.abs(YInner * tanA);
        for (var item of linePoint) {
          let x = item.x - XInner;
          let y = item.y + (isLarge ? YInner : -YInner);
          pointsIn.push(new THREE.Vector3(x, y, 0));
          item.x = x;
          item.y = y;
        }
        this.splitLine.push(pointsIn);
        const geometry = new THREE.BufferGeometry().setFromPoints(pointsIn);
        const line = new THREE.Line(geometry, material);
        this.scene.add(line);
      }
      count--;
    }
    // 计算多边形的边与切割线的交点
    this.crossPointList = this.getCrossPoint(this.pointList, this.splitLine);
    this.drawPointList(this.crossPointList)
    // 判断点是否在矩形内或者矩形上
    this.render();
  }
  // 两点的距离
  twoPointDis(point1, point2) {
    const x = point2.x - point1.x;
    const y = point2.y - point1.y;
    return Math.sqrt(x * x + y * y);
  }
  // 计算矩形的长和宽,以及较长边两点和较短边两点
  widthAndHeightOfRect(rectPoint) {
    let width = this.twoPointDis(rectPoint[0], rectPoint[1]);
    let height = this.twoPointDis(rectPoint[1], rectPoint[2]);
    let shortPoint = [],
      longPoint = [],
      long,
      short;
    if (width > height) {
      long = width;
      short = height;
      longPoint.push(rectPoint[0], rectPoint[1]);
      shortPoint.push(rectPoint[0], rectPoint[3]);
    } else {
      long = height;
      short = width;
      shortPoint.push(rectPoint[0], rectPoint[1]);
      longPoint.push(rectPoint[0], rectPoint[3]);
    }
    return {
      width,
      height,
      long,
      short,
      longPoint,
      shortPoint,
    };
  }
  // 直线的斜率
  kOfLine(point1, point2) {
    return (point2.y - point1.y) / (point2.x - point1.x);
  }
  // 两条线的交点
  segments_line(lines) {
    const a = lines.line_1.first,
      b = lines.line_1.second,
      c = lines.line_2.first,
      d = lines.line_2.second;
    // 1 解线性方程组, 求线段交点.
    // 如果分母为0 则平行或共线, 不相交 在此项目中只能是平行不存在共线，所以暂时不考虑
    const denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y);
    if (denominator == 0) {
      return false;
    }
    // 线段所在直线的交点坐标 (x , y)
    const x =
      ((b.x - a.x) * (d.x - c.x) * (c.y - a.y) +
        (b.y - a.y) * (d.x - c.x) * a.x -
        (d.y - c.y) * (b.x - a.x) * c.x) /
      denominator;
    const y =
      -(
        (b.y - a.y) * (d.y - c.y) * (c.x - a.x) +
        (b.x - a.x) * (d.y - c.y) * a.y -
        (d.x - c.x) * (b.y - a.y) * c.y
      ) / denominator;
    // 2 判断交点是否在两条线段上
    // 交点在线段1上 且交点也在线段2上
    if (
      (x - a.x) * (x - b.x) <= 0 &&
      (y - a.y) * (y - b.y) <= 0 &&
      (x - c.x) * (x - d.x) <= 0 &&
      (y - c.y) * (y - d.y) <= 0
    ) {
      // 返回交点p
      return {
        x,
        y,
      };
    }
    return false;
  }
  // 多边形与切割线的交点
  /**
   * @param {polygonList} 多边形点集合
   * @param {splitLineList} 分割线点集合
   */
  getCrossPoint(polygonList, splitLineList) {
    const lines = {
      line_1: {},
      line_2: {}
    };
    const res = []
    for (let i = 0; i < polygonList.length; i++) {
      lines.line_1.first = polygonList[i];
      lines.line_1.second = polygonList[i + 1];
      if (i + 1 == polygonList.length) {
        lines.line_1.second = polygonList[0];
      }
      for (let j = 0; j < splitLineList.length; j++) {
        lines.line_2.first = splitLineList[j][0];
        lines.line_2.second = splitLineList[j][1];
        let resPoint = this.segments_line(lines)
        if(resPoint){
          resPoint.isCrossPoint = true
          res.push(resPoint)
        }
      }
    }
    return res
  }
  // 根据坐标描点
  drawPointList(list){
    for(let point of list){
      var geometry = new THREE.BufferGeometry();
      var vertices = new Float32Array([point.x, point.y, point.z || 0]);
      var attribue = new THREE.BufferAttribute(vertices, 3);
      geometry.attributes.position = attribue;
      var material = new THREE.PointsMaterial({
        color: 'yellow',
        size: 5.0, //点对象像素尺寸
      }); //材质对象
      var points = new THREE.Points(geometry, material); //点模型对象
      this.scene.add(points);
    }
    this.render();
  }
  // 根据矩形进行点的分区
  splitCrossPoint(){

  }
  // 分区的点进行排序
  sortCrossPoint(){

  }
  // 点是否在矩形内  (按顺序的四个点 1,2,3,4) 需要判断的点 x,y 
  isInsideRect(x1,y1,x2,y2,x3,y3,x4,y4 ,x,y){
    if(x1 == x3) return this.isInside(x1, x4, y1, y4, x, y);
    var l = y4 - y3;
    var k = x4 - x3;
    var s = sqrt(k * k + l * l);
    var sin = l / s;
    var cos = k / s;
    var x1r = cos * x1 + sin * y1;
    var y1r = -x1 * sin + y1 * cos;
    var x4r = cos * x4 + sin * y4;
    var y4r = -x4 * sin + y4 * cos;
    var xr = cos * x + sin * y;
    var yr = -x * sin + y * cos;
    return this.isInside(x1r, x4r, y1r, y4r, xr, yr);
  }
  isInside(x1,x4,y1,y4){
    // 在平行x轴下进行判断
    if (x <= x1) return false;
    if (x >= x4) return false;
    if (y >= y1) return false;
    if (y <= y4) return false;
    return true;
  }
}
