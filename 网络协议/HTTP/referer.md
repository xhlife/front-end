### referrer 说明

referrer 是 HTTP 请求 header 的报文头，用于指明当前流量的来源参考页面。通过这个信息，我们可以知道访客是怎么来到当前页面的。

这对于 Web Analytics 非常重要，可以用于分析不同渠道流量分布、用户搜索的关键词等。

**Referer** 请求头包含了当前请求页面的来源页面的地址，即表示当前页面是通过此来源页面里的链接进入的。服务端一般使用 Referer 请求头识别访问来源，可能会以此进行统计分析、日志记录以及缓存优化等

### referrer 控制

> meta 方式

```html
<meta name="referrer" content="origin" />
<meta name="referrer" content="always" />
```

> html 标签方式

通过 referrerpolicy 在内容属性 a，area，img，iframe，link，或 script 元素

```html
<a href="http://example.com" referrerpolicy="origin"></a>
```

服务器发送网页的时候，通过 HTTP 头信息的 Referrer-Policy 告诉浏览器。

### Referrer policy 控制 Referrer 内容

referrer policy 各值的含义

1. no-referrer

不发送 Referer 字段。

2. no-referrer-when-downgrade

如果从 HTTPS 网址链接到 HTTP 网址，不发送 Referer 字段，其他情况发送（包括 HTTP 网址链接到 HTTP 网址）。这是浏览器的默认行为。

3. same-origin

遵循同源策略时发送，否则不发送

4. origin

Referer 字段一律只发送源信息（协议+域名+端口），不管是否跨域。

5. strict-origin

如果从 HTTPS 网址链接到 HTTP 网址，不发送 Referer 字段，其他情况只发送源信息。

6. origin-when-cross-origin

同源时，发送完整的 Referer 字段，跨域时发送源信息。

7. strict-origin-when-cross-origin

同源时，发送完整的 Referer 字段；跨域时，如果 HTTPS 网址链接到 HTTP 网址，不发送 Referer 字段，否则发送源信息

8. unsafe-url

Referer 字段包含源信息、路径和查询字符串，不包含锚点、用户名和密码。

#### 如何让浏览器在访问链接时不要带上 referrer

1. 基于 HTML 标准，可以在 a 标签内使用 rel="noreferrer"来达到这一目的。目前大部分基于 Webkit 的浏览器已经支持。Opera 并没有提供可以实现不发送 referrer 的方法，Firefox 也不支持。

2. 提供跨浏览器支持的更好的办法是使用一个第三方的库 noreferrer.js，它可以自动识别浏览器并选择最优方案。实现方式利用 google url 中转，国内环境不行。

3. 跨浏览器解决方案，做一个自己网站的中转页。例如百度，搜索结果页跳转都会经过一个中转页。

那么百度中转页，做了什么事？

1. 从 referer 剥离参数 wd，保护用户隐私
2. 新窗口打开中间页面
3. 验证点击真实性

```html
<meta content="always" name="referrer" />
<script>
  try {
    if (window.opener && window.opener.bds && window.opener.bds.pdc && window.opener.bds.pdc.sendLinkLog) {
      window.opener.bds.pdc.sendLinkLog()
    }
  } catch (e) {}
  var timeout = 0
  if (/bdlksmp/.test(window.location.href)) {
    var reg = /bdlksmp=([^=&]+)/
    var matches = window.location.href.match(reg)
    timeout = matches[1] ? matches[1] : 0
    setTimeout(function () {
      window.location.replace("https://www.google.com.hk/")
    }, timeout)
  }

  window.opener = null
</script>
```

百度在这个中间页调用了 window.opener.bds.pdc.sendLinkLog(); 即在百度搜索结果页调用 sendLinkLog()统计方法，验证是不是真实点击，因为如果不是从搜索结果页进入，是不存在这个方法的。虽然不能杜绝虚假模拟点击，这很大程度上过滤掉了许多爬虫和低级的虚假点击，为点击数据真实性加了“双保险”。

#### 在 vue 项目开发中

如果后端设置了 Referer 校验， 导致接口 400

那么开发环境下，需要设置 devServer 的 header

```js
proxy: {
  'xxx/xxx': {
    target: 'xxxxxxxx',
    header: {
      Referer: 'https://xxxxxxxxxxxxxxx'
    }
  }
}
```
