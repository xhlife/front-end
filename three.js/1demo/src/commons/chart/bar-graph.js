import * as THREE from 'three'
import { camera, scene, renderer } from '../../commons/base/base'

/**
 *
 * @param {*} length 长
 * @param {*} width  宽
 * @param {*} height 高
 * @param {*} x   x坐标
 * @param {*} y   y坐标
 * @param {*} z   z坐标
 * @param {Array} colors 颜色
 */
const cubex = (length, width, height, x, y, z) => {
  var geometryCube = new THREE.BoxGeometry(length, width, height)
  geometryCube.translate(x, y, z)
  var materialCube = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  })
  var mesh = new THREE.Mesh(geometryCube, materialCube)
  return mesh
}

/**
 * 文字
 * @param {*} size 文字大小
 * @param {*} height 文字高度
 * @param {*} x x坐标
 * @param {*} y y坐标
 * @param {*} z z坐标
 * @param {*} callback 回调
 */
const text = (size, height, x, y, z, callback) => {
  var textGeo
  var loader = new THREE.FontLoader() // 加载字体
  loader.load(
    '/font/test.json',
    function(font) {
      textGeo = new THREE.TextGeometry('try try', {
        font: font,
        size: size,
        height: height,
      })
      //创建法向量材质
      var meshMaterial = new THREE.MeshNormalMaterial({
        flatShading: THREE.FlatShading,
        transparent: true,
        opacity: 0.9,
      })
      var mesh = new THREE.Mesh(textGeo, meshMaterial)
      mesh.position.set(x, y, z)
      callback(mesh)
    },
    function(xhr) {
      //加载进度
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    function(err) {
      //出现错误
      console.log(err)
    }
  )
}

// 柱形图
const bar = () => {
  for (let i = 0, x = 0; i < 8; i++) {
    var h = parseInt((Math.random() * 10) / 4)
    let mesh = cubex(0.1, h, 0.1, x, h / 2, 0)
    scene.add(mesh)
    text(0.02, 0.01, x, h + 0.01, 0, function(m) {
      scene.add(m)
      renderer.render(scene, camera)
    })
    x += 0.12
  }
  scene.add(cubex(1, 0.01, 0.01, 0.45, 0.005, 0.1))
  scene.add(cubex(0.01, 1, 0.01, -0.05, 0.5, 0.1))
  renderer.render(scene, camera)
}

export { cubex, text, bar }
