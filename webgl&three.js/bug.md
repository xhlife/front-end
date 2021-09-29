#### 在vue中动画，无法渲染问题
https://blog.csdn.net/wang_nai_jun/article/details/118400597



#### canvas转图片问题
```js
// 直接通过canvas 会发现内容转为图片后，图片为空
canvas.toDataURL(); 

 // 修改为下面的代码 
 // 转换前，  通过渲染器渲染一遍
 renderer.render(scene,camera);
 canvas.toDataURL();
```