cursor设置默认的一些鼠标样式没有问题

采用url方式兼容问题

MDN上的一段英文翻译

> 可以使用 Gecko 支持的所有图像格式。
> 这意味着您可以使用 PNG、GIF、JPG、
> BMP、CUR 等图像。不支持 ANI。动画 
> PNG 或 GIF 不会创建动画光标。

上面支出需要 Gecko 内核支持

在 chrome下不支持，但是同事的chrome可以使用png, 我的只能png

可能是版本问题

使用svg 时注意点： 必须时纯svg标签

什么意思？ 

从阿狸图标库下载了svg ，他前面是有一些 xml标准的

```html
<!-- 这种方式导致svg渲染不出来 -->
<?xml..... > <svg></svg>
```

后来把前面的删除就可以

```html
<svg>...</svg>
```