const Animate = function(dom){
  this.dom = dom; // 进行运动的 dom 节点

  this.startTime = 0; // 动画开始时间
  this.duration = null; // 动画持续时间

  this.startPos = 0; // 动画开始时，dom 节点的位置，即 dom 的初始位置
  this.endPos = 0; // 动画结束时，dom 节点的位置，即 dom 的目标位置

  this.propertyName = null; // dom 节点需要被改变的 css 属性名

  this.easing = null; // 缓动算法(缓动函数)
}
/**
 * @des 用于启动动画
 * @param {propertyName} 需要动画的属性
 * @param {endPos} 属性最终的目标
 * @param {duration} 持续时间
 * @param {easing}  缓动函数
*/

Animate.prototype.start = function(propertyName, endPos, duration, easing){
  this.startTime = +new Date; // 动画启动时间
  this.startPos = this.dom.getBoundingClientRect()[ propertyName ]; // dom 节点初始位置
  this.propertyName = propertyName; // dom 节点需要被改变的 CSS 属性名
  this.endPos = endPos; // dom 节点目标位置
  this.duration = duration; // 动画持续事件
  this.easing = Tween[easing]; // 缓动算法

  let timer = setInterval(() => {
    if(this.step() === false){  // 如果步长为零，说明动画已经结束
      clearInterval(timer)
    }
  },19)
}
Animate.prototype.step = function(){
  let t = +new Date; // 取得当前时间
  if ( t >= this.startTime + this.duration ){ // 如果时间已过
    this.update( this.endPos ); // 更新 CSS 属性值
    return false;
  }
  let pos = this.easing( t - this.startTime, this.startPos,
  this.endPos - this.startPos, this.duration );
     // pos 为当前位置
    this.update( pos ); // 更新的 CSS 属性值
}; 
// 更新属性
Animate.prototype.update = function( pos ){
 this.dom.style[ this.propertyName ] = pos + 'px';
}; 