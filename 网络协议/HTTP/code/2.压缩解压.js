/**
 *  采用 zib 模块， 压缩
 *  具体API查看文档
*/

const fs = require('fs')
const zlib = require('zlib')
const http = require('http')
const { promisify } = require('util')
const url = require('url')
// const mime = require('mime')
const path = require('path')
// 将异步方法转 promise
const stat = promisify(fs.stat)


/**
 * 客户端向服务器发起请求的时候，会通过accept-encoding告诉服务区是否支持解压缩格式
 * accept-encoding:gzip, deflate,br
 * deflate算法进行压缩
*/

const server = http.createServer() 

server.on('request', async function(req, res){
  const {pathname} = url.parse(req.url, true)
  const filepath = path.join(__dirname, pathname)

  try {
    const statObj = await stat(filepath)
    res.setHeader('Content-Type', /*mime.getType(pathname)*/'text/plain;charset=utf-8')
    const acceptEncoding = req.headers['accept-encoding']
    console.log(acceptEncoding);
    if(acceptEncoding) {
      if(acceptEncoding.match(/\bgzip\b/)) {
        res.setHeader('Content-Encoding', 'gzip')
        fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res)
      } else if(acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate')
        fs.createReadStream(filepath).pipe(zlib.createDeflate()).pipe(res)
      } else { // 内容协商
        fs.createReadStream(filepath).pipe(res)
      }
    } else {
      fs.createReadStream(filepath).pipe(res)
    }
    
  } catch (error) {
    
  }
})

server.listen(8080, function() {
  console.log('run');
})