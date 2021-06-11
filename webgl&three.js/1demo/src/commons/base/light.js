import * as THREE from "three";

// 环境光
const ambientLight = () => {
    var al = new THREE.AmbientLight(0xffffff, 0.1); // 创建环境光

    return al;
}

// 射灯
const spotLight = () => {
    var sl = new THREE.SpotLight(0xffffff);
    sl.position.set(0.5, 1, 1);
    sl.angle = Math.PI / 4;
    sl.penumbra = 0.05;
    sl.decay = 2;
    sl.distance = 200;

    sl.castShadow = true;
    sl.shadow.mapSize.width = 1024;
    sl.shadow.mapSize.height = 1024;
    sl.shadow.camera.near = 10;
    sl.shadow.camera.far = 200;
    
    return sl;
}

export {
    ambientLight,
    spotLight
}