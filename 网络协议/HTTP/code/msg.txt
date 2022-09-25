// http服务器继承自 tcp 服务器
// http是应用层协议， 是基于 tcp的
// req和res 都是从socket来的
let http = require('http')
const url = require('url')
const server = http.createServer()
server.on('connection', function(socket) {
  // console.log(socket);
  console.log('客户端连接');
})

server.on('request', function(req, res) {
  // console.log(req.method);
  // console.log(req.url);
  // console.log(req.protocal);
  // console.log(req.headers);

  // 获取get参数
  let query = url.parse(req.url, true)
  console.log(query);
  let result = []
  req.on('data', function(data) {
    // post 请求参数获取
    result.push(data)
  })
  req.on('end', function() {
    let f = Buffer.concat(result)
    console.log(f);
    res.end(f)
  })

  // 设置相应头
  // res.statusCode = 200  
  // res.sendDate = false
  // res.setHeader('contnent-type', 'type/html;chartset=utf-8')
  // 获取响应头
  // res.getHeader('content-type)
  // res.removeHeader('content-type)
  // res.write()
  // res.end() 
  // res.write() // 报错， 因为end之后不能write


  // 响应头什么时候发送给客户端
  // 1、调用write\ end
  // 2、 res.writeHead(200, {contentType:xxx})
  // res.setHeader('content-type':'xxx')
  // console.log(res.headerSent); // false
  // res.writeHead(200, {contentType:xxx})
  // console.log(res.headerSent); // true
})

server.on('close', function(req, res) {

})

server.on('error', function(error) {
  console.log(error);
})
server.listen(8080, function() {
  console.log('server is run ');
})