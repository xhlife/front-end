import * as THREE from "three";
import {camera, scene, renderer} from '../../commons/base/base'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

 // 箭头辅助
const arrowHelper = () => {
    var dir = new THREE.Vector3(1, 0, 0);
    var origin = new THREE.Vector3(0, 0, 0);
    var length = 1;
    var hex = 0xffff00;
    var ah = new THREE.ArrowHelper(dir, origin, length, hex);
    return ah;
}

// 网格辅助
const gridHelper = () => {
    var gh = new THREE.GridHelper(1, 10, 0x2c2c2c, 0x888888);
    return gh;
}


// 光源辅助
const lightHelper = (spotLight) => {
    var lh = new THREE.SpotLightHelper(spotLight);

    return lh;
}


// 鼠标辅助
const orbit = () => {
    var ct = new OrbitControls(camera, renderer.domElement);
    ct.update();
    //监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
    ct.addEventListener("change", function(){
        renderer.render(scene, camera); //执行渲染操作
    });
    return ct;
}


// 移动摄像机
const animation = () => {
    camera.position.x =camera.position.x +1;  // 关键地方  没调一次animation()方法，x就自加1，就会让摄像机的位置改变，这样看到的物体就动了
    renderer.render(scene, camera);   // 渲染
    setTimeout(() => {
        requestAnimationFrame(animation);  // 循环调用animation()方法
    }, 2000);
    
}



export {
    arrowHelper,
    gridHelper,
    lightHelper,
    orbit,
    animation
}