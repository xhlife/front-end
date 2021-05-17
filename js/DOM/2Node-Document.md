### Documnet类型
js通过Document类型来表示文档

在浏览器中，经常使用的document对象是HTMLDocument的一个实例，表示整个HTML页面
```javascript
document.__proto__  // HTMLDocument {Symbol(Symbol.toStringTag): "HTMLDocument", constructor: ƒ}

document; // 是整个网页的文档对象 #document,也可以说是document节点
```
documnet节点具有下列特征： 
+ nodeType 值为 9
+ nodeName 值为 #document
+ nodeValue 值为 null
+ parentNode 值为 null
+ ownerDocumnet 值为 null
+ 其子节点可能是一个DocumentType类型节点(最多一个)、Element类型节点（最多一个）、ProcessingInstruction或Comment

#### 文档(documnet)节点的子节点
文档节点的子节点可以是DocumentType、Element、ProcessingInstruction或Comment

但是可以通过内置属性直接访问其子节点

1. documnetElement
   该属性始终指向HTML页面中的`<html>`元素
   ```javascript
   document.documentElement;  // <html><head>...</head><body>...</body></html>
   ```
2. childNodes
   通过节点列表的方式访问文档元素
  ```javascript
  document.childNodes[0] // <html><head>...</head><body>...</body></html>

  document.documentElement  === document.childNodes[0]  // true
  ```
3. body
   可以直接拿到body节点
   ```javascript
   document.body
   ```
4. doctype
   取得对<!DOCTYPE>的引用

#### 文档信息
可以通过document获取网页的一些基本信息
1. title   文档标题
2. URL    文档完整的URL
3. domain   域名
4. referrer 获得来源网页的URL

URL和domain是互相关联的，但domain可设置(对设置值有要求，遵循基本的同源策略)，URL不可设置


#### 查找元素
document代表整个页面，因此可以通过一些API快速获取元素

主要有以下方法
```javascript
// getElementBy...的方式

    // 返回单个元素
document.getElementById() 
    // 返回HTMLCollection对象
document.getElementsByTagName()
document.getElementsByName()
    // 返回NodeList对象
document.getElementsByClassName()
// document.query...方式
    // 始终返回一个元素,匹配指定选择器的第一个元素
document.querySelector() 
    // 返回多个元素,匹配的CSS选择器的所有元素节点列表
document.querySelectorAll()
```
#### NodeList与HTMLCollection区别
NodeList中可以包含所有的节点类型

HTMLCollection只能包含ElementNode类型(div，p,ul,li等)的节点

比如, NodeList中会有Text类型，而HTMLCollection中不会有Text类型




[document对象的方法和属性--Runoob文档](https://www.runoob.com/jsref/dom-obj-document.html)


