往往出现在瀑布流布局中，若上一行浮动块高度不一致，就会导致在当前行浮动过程中被阻挡。margin 也是浮动块停止的边缘。一般情况下，往往是因为盒子的内容高度不一致，问题最多的是图片。当每个图片的宽高比不一致时，设置相同高度。高度会有差异。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .block {
        width: 25%;

        padding: 10px;

        float: left;

        box-sizing: border-box;
        height: 280px;
        background-color: pink;
        border: 1px solid #ddd;
      }

      .block div {
        width: 100%;
      }
      #special {
        height: 100px;
      }
    </style>
  </head>
  <body>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block" id="special"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
    <div class="block"></div>
  </body>
</html>
```
