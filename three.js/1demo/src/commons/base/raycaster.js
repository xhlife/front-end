import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls"
import {DragControls} from "three/examples/jsm/controls/DragControls"
import { camera, scene, renderer } from '../../commons/base/base'
import { orbit } from "./helper";

//声明raycaster和mouse变量
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
let orbitx = orbit();

// 物体选中, 射线
const clickRaycaster = (event) => {
    
    //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
    raycaster.setFromCamera(mouse, camera);

    // 获取raycaster直线和所有模型相交的数组集合
    var intersects = raycaster.intersectObjects(scene.children);
    //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
    for (var i = 0; i < intersects.length; i++) {
        if (intersects[i].object.type == 'GridHelper') continue;
        console.log(intersects[i])
        intersects[i].object.material.color.set(0xff0000);
        transformC(intersects[i].object, orbitx)
    }

    renderer.render(scene, camera);
}

/**
 * 
 * @param {} orbit 鼠标控制器,即OrbitControls
 */
const transformC = (mesh, orbitx) => {
    console.log(mesh)
    var transformControl = new TransformControls(camera, renderer.domElement);
     
    transformControl.space = 'local'

    transformControl.addEventListener('change', function render() {
        renderer.render(scene, camera);
    });
    transformControl.addEventListener('dragging-changed', function (event) {
        orbitx.enabled = !event.value;
    });
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 81: // Q
                transformControl.setSpace(transformControl.space === "local" ? "world" : "local");
                break;
            case 87: // W
                transformControl.setMode("translate");
                break;
            case 69: // E
                transformControl.setMode("rotate");
                break;
            case 82: // R
                transformControl.setMode("scale");
                break;
            case 88: // X
                transformControl.showX = !transformControl.showX;
                break;

            case 89: // Y
                transformControl.showY = !transformControl.showY;
                break;

            case 90: // Z
                transformControl.showZ = !transformControl.showZ;
                break;
        }
    });
    // 过滤不是 Mesh 的物体,例如辅助网格
    transformControl.attach(mesh);
    scene.add(transformControl);

    dragc(transformControl)
}

const dragc = (transformControl) => {
    var dragcontrols = new DragControls( splineHelperObjects, camera, renderer.domElement ); //
    dragcontrols.enabled = false;
    dragcontrols.addEventListener( 'hoveron', function ( event ) {

        transformControl.attach( event.object );
        cancelHideTransform();

    } );

    dragcontrols.addEventListener( 'hoveroff', function () {
        delayHideTransform(transformControl);
    } );
}

const delayHideTransform = (transformControl)=> {
    cancelHideTransform();
    hideTransform(transformControl);
}

var hiding;
var splineHelperObjects = [];
const hideTransform = (transformControl)=> {
    hiding = setTimeout( function () {
        transformControl.detach( transformControl.object );
    }, 2500 );
}
const cancelHideTransform = () => {
    if ( hiding ) clearTimeout( hiding );
}

const onWindowResize = () => {
    let aspect = window.innerWidth / window.innerHeight;

    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    camera.left = camera.bottom * aspect;
    camera.right = camera.top * aspect;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.render(scene, camera);
}

export {
    clickRaycaster,
    transformC
}