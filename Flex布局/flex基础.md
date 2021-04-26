[基础篇-阮一峰日志](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

flex核心： 主轴、交叉轴、容器属性、项目属性

简单理解，
#### 主轴： 默认笛卡尔坐标X轴  (→)
#### 交叉轴： 默认笛卡尔坐标Y轴  (↓)

#### 容器属性（主要分为6个）,所谓容器就是设置了display: flex;的盒子

容器可以设置的flex属性为下面的6种,

+ flex-direction 主轴的方向
+ flex-wrap  当主轴方向的项目数过多导致放不下，是否进行换行
+ flex-flow 上面两个属性的简写  flex-flow: <flex-direction> <flex-wrap>
+ justify-content 项目在主轴方向的对其方式
+ align-items 项目在交叉轴方向的对齐方式
+ align-content 多根轴线的对齐方式

#### 项目属性 （也就是容器内部的盒子）
项目属性也主要分为6个

+ order: <integer> 排列顺序  数值越小排列越前,默认为 0；
+ flex-grow: <number> grow（长大）, 定义项目的放大比例，默认为0,即不放大
+ flex-shrink <number> shrink(收缩)，定义项目的缩小比例，默认为1,即空间不足将缩小
+ flex-basis: <length> basis(主要，主体)，分配多余空间前，项目占据的主轴空间，根据这个属性计算主轴是否有多余的空间，默认为auto,即项目原本的大小
+ flex 为上面三个属性的简写，因此默认 0 1 auto,后两个属性可选，flex: 1; 即放大

+ align-self: 允许单个项目和其他项目不一样的对齐方式，可覆盖容器属性align-items属性，默认auto

[flex实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

