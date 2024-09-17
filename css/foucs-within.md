
```html
<div class="form-block">
  <input class="text" />
</div>
```

需求： 当输入框获得焦点时，form-block 的背景色变为红色

```css
.form-block:focus {
  background: red;
}
```

可以发现上面不生效

那么采用 focus-within 属性, 他可以监听子元素是否有focus，有则高亮

```css
.form-block:focus-within {
  background: red;
}
```