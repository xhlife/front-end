<template>
  <span></span>
</template>

<script>
import { camera, scene, renderer } from '../commons/base/base'
import { gridHelper, arrowHelper } from '../commons/base/helper'
import { bar } from '../commons/chart/bar-graph'
import { clickRaycaster } from '../commons/base/raycaster'

export default {
  setup() {
    var init = () => {
      // 柱形图
      bar()

      scene.add(arrowHelper()) // 添加坐标轴
      scene.add(gridHelper())  // 添加网格辅组
      renderer.render(scene, camera)
      document.body.appendChild(renderer.domElement)

      window.addEventListener('click', clickRaycaster, false)
      console.log('-------------->init over')
    }
    init()

    return {}
  },

  mounted() {
    console.log('Counter ===> 相当于 vue2.x 中 mounted')
  },
}
</script>
