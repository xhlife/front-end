import * as THREE from "three";

const c = () => {
    // 相机
    var camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
    );
    camera.position.z = 1;
    return camera;
}

const s = () => {// 场景
    var scene = new THREE.Scene();
    return scene;
}

const r = () => {

    // 渲染器
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
}
var renderer = r(), scene= s(), camera = c()

export {
    renderer,
    scene,
    camera
}