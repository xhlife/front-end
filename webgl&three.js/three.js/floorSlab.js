class FloorSlab {
    constructor(scene,camera,renderer){
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.canvas = renderer.domElement
        this.pointList = [] // 点击的点的集合
        this.edgeList = []  // 凸包点集合
        this.raycaster = new THREE.Raycaster();
    }
    // 初始化，画板的点击事件
    init(){
        this.addPlane()
        this._drawPoint = this.drawPoint.bind(this)
    }
    render(){
        this.renderer.render(this.scene,this.camera)
    }
    // 添加一个平面
    addPlane(){
        var planeDom = this.canvas
        var geometry = new THREE.PlaneGeometry(planeDom.offsetWidth, planeDom.offsetHeight, 1);
        var material = new THREE.MeshBasicMaterial({ color: 'skyblue', side: THREE.DoubleSide });
        var plane = new THREE.Mesh(geometry, material);
        this.scene.add(plane);
        this.renderer.render(this.scene,this.camera)
    }
    // 收集点击的点坐标（x,y,10）
    collectPoint(p){
        var point = { 'x': p.point.x, 'y': p.point.y }
        this.pointList.push(point);
        return this.pointList
    }
    // 描绘一个点
    drawPoint(e){
        var mouse = new THREE.Vector2()
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        this.raycaster.setFromCamera(mouse,camera)
        var intersects = this.raycaster.intersectObjects( scene.children );
        if ( intersects.length > 0 ) {
			const intersect = intersects[ 0 ];
            this.collectPoint(intersect)
            var pointer = {x:intersect.point.x,y:intersect.point.y}
            var geometry = new THREE.BufferGeometry(); 
            var vertices = new Float32Array([pointer.x, pointer.y, 0]);
            var attribue = new THREE.BufferAttribute(vertices, 3);
            geometry.attributes.position = attribue;
            var material = new THREE.PointsMaterial({
            color: 0xff0000,
            size: 5.0 //点对象像素尺寸
            }); //材质对象
            var points = new THREE.Points(geometry, material); //点模型对象
            this.scene.add(points)
            this.renderer.render(this.scene,this.camera)
        }
    }
    // 生成轮廓
    createShape(){
        var points = []
        for(var item of this.pointList){
            points.push(new THREE.Vector2(item.x,item.y))
        }
        var shape = new THREE.Shape(points);
        var material = new THREE.MeshBasicMaterial({
            color: 0x3300ff
        });
        var geometry = new THREE.ExtrudeGeometry(shape,
            {
                depth:0.5,//拉伸长度
                bevelEnabled:false//无倒角
            }
        );
        var mesh = new THREE.Mesh(geometry,material)
        this.scene.add(mesh)
        this.render()
        this._shape = shape
        this._shapeMaterial = material
        this._shapeMesh = mesh
        // 生成凸包点集合
        this.createHullShapePoint()
        this.pointList = []
    }
    // 生成凸包
    createHullShape(){
        var points = []
        for(var item of this.edgeList){
            points.push(new THREE.Vector2(item.x,item.y))
        }
        var shape = new THREE.Shape(points);
        var material = new THREE.MeshBasicMaterial({
            color: 0x336699
        });
        var geometry = new THREE.ExtrudeGeometry(shape,
            {
                depth:0.5,//拉伸长度
                bevelEnabled:false//无倒角
            }
        );
        var mesh = new THREE.Mesh(geometry,material)
        this.scene.add(mesh)
        this.render()
    }
    // 拉伸轮廓模型
    createModel(depth){
        const points = this.scene.children.filter(item => item.type === 'Points')
        points.push(this._shapeMesh)
        this.scene.remove(...points)
        var geometry = new THREE.ExtrudeGeometry(this._shape,
            {
                depth:depth || 50,//拉伸长度
                bevelEnabled:false//无倒角
            }
        );
        var mesh = new THREE.Mesh(geometry,this._shapeMaterial)
        this.scene.add(mesh)
        this.render()
    }
    // 监听点击事件
    addClickEvent(){
        this.canvas.addEventListener('click',this._drawPoint)
    }
    // 取消点击事件
    cancelClickEvent(){
        this.canvas.removeEventListener('click',this._drawPoint)
    }
    // 凸包计算
    createHullShapePoint(){
        this.edgeList = []
        var ltl = this.LTL();
        var k = ltl;
        var arr = this.pointList
        var pointLen = arr.length
        do {
            this.edgeList.push(arr[k]);
            var s = -1;
            for (var t = 0; t < pointLen; t++) {
                if (t != k && t != s && (s == -1 || !this.toLeft(arr[k], arr[s], arr[t]))) {
                    s = t;
                };
            };
            k = s;
            var tmp = this.edgeList[this.edgeList.length-1]
            if(!tmp.x == arr[k].x && !tmp.y == arr[k].y){
                this.edgeList.push(arr[k]);
            }
        } while (ltl != k);
        return this.edgeList
    }
    // 往左还是右
    toLeft(p, q, s) {
        return p.x * q.y - p.y * q.x + q.x * s.y - q.y * s.x + s.x * p.y - s.y * p.x > 0;
    }
    // 检测边缘
    checkEdge(p, q, n) {
        var L, R = true;
        for (var i = 0; i < n && (L || R); i++) {
            if (i != p && i != q) {
                this.toLeft(this.pointList[p], this.pointList[q], this.pointList[i]) ? L = false : R = false;
            };
        };
        if (L || R) {
            this.pointList[p].extrme = this.pointList[q].extrme = true;
        };
    }
    // 寻找最小的 y 轴坐标
    LTL() {
        var arr = this.pointList
        var min = arr[0];
        var minNum = 0;
        var len = arr.length
        for (var i = 1; i < len; i++) {
            if (min.y <= arr[i].y) {
                min = arr[i];
                minNum = i;
            };
        };
        return minNum;
    }
    // 凸包中心点计算
    getHullCenter(list){
        const result = list.reduce((prev, next) => {
        return {
            x: +prev.x + +next.x,
            y: +prev.y + +next.y
        }
        },{
            x: '',
            y: ''
        })
        const center = {
            x: result.x / list.length,
            y: result.y / list.length
        }
        return center
    }
    // 旋转多边形，针对每个点实现绕中心点旋转
    pointRotate(point,centerPoint,angle){
        var x1 = point.x
        var y1 = point.y
        var x0 = centerPoint.x
        var y0 = centerPoint.y
        var Q = angle / 180 * 3.14115926

        var x2,y2
        x2 = (x1-x0)*Math.cos(Q)-(y1-y0)*Math.sin(Q)+x0;   //旋转公式
        y2 = (x1-x0)*Math.sin(Q)+(y1-y0)*Math.cos(Q)+y0;
        return {
            x: x2,
            y: y2
        }
    }
    // 简单外接矩形
    findEasyRect(hullList){
        var len = hullList.length
        if(!len) return false
        var Xmax = 0
        var Ymax = 0
        var Xmin = 60000000;  //最小值不能初始为0，
        var Ymin = 1000000000;  //最小值不能初始为0，
        for(let item of hullList){
            var tempx = item.x
            var tempy = item.y
            if(tempx>=Xmax) Xmax = tempx;  //最大x，
            if(tempy>=Ymax) Ymax = tempy;  //最大y，
            if(tempx<=Xmin) Xmin = tempx;  //最小x
            if(tempy<=Ymin) Ymin = tempy;  //最小y
        }
        var p1 = {x: Xmax, y: Ymax};  //左上
        var p2 = {x: Xmax, y: Ymin};
        var p3 = {x: Xmin, y: Ymin};
        var p4 = {x: Xmin, y: Ymax};
        var rectanglePoint = [p1,p2,p3,p4]
        return rectanglePoint
    }
    // 存储每个旋转角度下多边形的外接矩形，记录外接矩形的顶点坐标、面积和此时多边形的旋转角度
    getRotateRectDatas(newHullList,angle){
        const center = this.getHullCenter(newHullList)
        const list = []  // 收集旋转后的凸包点
        for(var item of newHullList){
            var tmp = this.pointRotate(item,center,angle)
            list.push(tmp)
        }
        const rectPoint = this.findEasyRect(list)
        var deltaX, deltaY
        deltaX = rectPoint[0].x - rectPoint[2].x;
        deltaY = rectPoint[0].y - rectPoint[2].y;
        return {
            area: Math.abs(deltaY * deltaX),
            angle,
            center,
            boundary: rectPoint
        }
    }
    // 获取所有的矩形
    getAllNewRectDatas(hullList){
        var rectList = []
        for(var angle = 0; angle <=90;){
            rectList.push(this.getRotateRectDatas(hullList,angle))
            angle += 0.5
        }
        console.log(rectList);
        return rectList
    }
    // 画最小矩形
    drawMinRect(hullList ){
        if(!hullList || hullList.length < 2) return false
        // 获取所有矩形的列表
        const rects = this.getAllNewRectDatas(hullList)
        const rect = this.getMinRect(rects)
        const material = new THREE.LineBasicMaterial({
	        color: 'purple'
        });
        const points = [];
        for(var item of rect.boundary){
            points.push(new THREE.Vector3( item.x, item.y, 0 ))
        }
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const line = new THREE.LineLoop( geometry, material );
        this.scene.add( line );
        // return rect
        this.render()
    }
    getMinRect(rectList){
        var minArea = 100000000
        var N = 0
        for(let i =0; i< rectList.length;i++){
            if(minArea > rectList[i].area){
                minArea = rectList[i].area
                N = i
            }
        }
        // 旋转到最小面积的方向
        var polygon = rectList[N]
        var boundary = []
        polygon.boundary.forEach( item => {
                var pt = this.pointRotate(item,polygon.center,-polygon.angle)
                boundary.push(pt)
        })
        var outpolygon = {
            center: polygon.center,
            area: polygon.area,
            angle: polygon.angle,
            boundary
        }
        return outpolygon
    }
}