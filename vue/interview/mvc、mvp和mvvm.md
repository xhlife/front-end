### web1.0时代

在web1.0时代，没有前端的概念， 开发多用aps.net/ java/ php, 项目 通常由多个aspx/jsp/php文件构成，每个文件中同时包含了HTML、css、javascript、c#/java/php代码，整个系统简单快捷，但是代码难以维护

为了让开发更加敏捷，代码更加容易维护，前后端职责更清晰。便衍生出MVC开发模式和框架，前端展示以模版的形式存在。
但这里的mvc仅限于后端，前后端形成了一定的分离，前端只要完成了后端开发中的view层，但是这种模式存前端页面的开发效率不高，前后端职责不清

### web2.0时代

ajax技术出现，前后端职责就更加清晰了。

同时，前端的类库也慢慢的发展，最著名就是jQuery了

### 前后端分离后的框架演变--MVC、MVP、和MVVM

#### 前端MVC
前端MVC与后端类似，具备View、Controller和Model。

* model： 负责保存应用数据，与后端数据同步
* Control: 负责业务逻辑，根据用户数据行为对Model数据进行修改
* view: 负责视图的展示，将model中的数据可视化出来

#### MVP
与MVC很接近， P指的是Presenter, 可以理解为中间人，它负责着View和Model之间的数据流动，防止View和Model之间直接交流。

Model - Presenter - View之间都是双向的。 这种交互方式，相对于MVC来说少了一些灵活，View变成了被动视图，本身变得很小。 
但是应用逐步变大之后，导致presenter的体积增大，难以维护。 

#### MVVM

MVVM(Model-View-ViewModel), 可以理解为presenter基础上的进阶版

model和view还是与MVC时的功能基本一致

但是Control换成了ViewModel

ViewModel主要包括两部分， DomListeners 和 Directives 

View通过DomListeners通知Model, 比如按钮点击，键盘按下等
Model全部是数据逻辑操作，数据发生变化之后， 通过ViewModel的Directives更新View



