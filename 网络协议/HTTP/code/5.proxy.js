// 代理服务
// 例如 http-proxy
// 正向代理 - 帮助或代理局域网内的用户访问外网
// 反向代理 - 用来代理局域网内的服务器


// 下面的例子是正向代理

const proxy = require('http-proxy')
const proxyServer = proxy.createProxyServer()
const http = require('http')

const http = http.createServer(function(req,res) {
  proxyServer.web(req, res, {
    target: 'http://localhost:9000'
  })
}).listen(8000)