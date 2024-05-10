## Three.js的渲染结构

### 概述

three.js封装了场景、灯光、阴影、材质、纹理和三维算法，可以不用直接采用webgl开发项目

当然，有时候需要自定义着色器，还是会直接采用webgl的

下面是一个基本的three.js渲染结构

![three.js渲染结构](./imgs/threejs-structure.svg)

模块解析: 

- Renderer渲染器

  Renderer 是three.js的主要对象， 当你将一个场景scene和一个摄像机Camera
  传递到渲染器中，渲染器便会将摄像机视椎体中的三维场景渲染成一个二维图像显示在canvas画布中。

- Scene 场景对象

  场景对象是树状结构，其中包含了三维对象Object3D和灯光对象Light

  Object3D是可以被直接渲染出来的，Object3D是网格对象Mesh和集合对象Group的基类

  场景对象可以对定义场景的背景色和雾效。

  在场景对象的树状结构中， 每个对象的变换信息都是先相对的。

  比如汽车和汽车里的人， 人的位置是相对于汽车而言的，当汽车移动了，人的本地坐标位虽然不变，
  但是其世界坐标位已经变了

- Camera 相机对象

  按理说，相机对象是在场景里的， 但是相机对象不在它所看的场景里，就像我们自己看不见自己的眼睛

  因此， 相机对象可以独立于场景之外

  相机对象是可以作为其他三维对象的子对象的，这样相机就会随父对象同步变换。


- Mesh 网格对象

  基类是Object3D

  网格对象由几何体Geometry和材质Material 两部分组成

    - Geometry 负责塑形
    - Material 负责着色

  Geometry和Material是可以被多个Mesh对象复用的。


  比如要绘制两个一模一样的立方体，那么只需要实例化两个Mesh即可，Geometry和Material可以使用一套

- Geometry几何体对象

  几何体塑形对象，存储了与顶点相关的数据，比如顶点点位、顶点索引、uv坐标等

  three.js中内置了许多基本几何体，也可以自定义几何体，或者从外部的模型文件中加载几何体

- Material 材质对象

  材质对象负责着色，绘制几何体的表面属性，比如漫反射、镜面反射、光泽度、凹凸等
  
  材质对象的许多属性都可以用纹理贴图表示，比如漫反射贴图、凹凸贴图等

- Texture纹理对象

  纹理对象就是一张图像。 纹理图像的图像源可以是 Image图片、canvas画布、Video视频等

- Light 光源对象

  Light对象不像Object3D那样依托于顶点，他更多的是想Object3D里的材质Material那样，作用于物体的样式

  Light对象可以理解为在为几何体添加了材质后，再利用光效配合材质对几何体的样式进行二次加工

  
