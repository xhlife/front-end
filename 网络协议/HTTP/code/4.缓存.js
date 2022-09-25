const fs = require('fs')
const http = require('http')
const mime = require('mime')
const path = require('path')
const url = require('url')
const crypto = require('crypto')
// 通过文件修改时间判断是否使用缓存资源
// Last-Modified(响应头中) / if-modified-since (请求头中)
// 存在的问题
/**
 * 1、某些服务器不能精确到文件的最后修改时间， 这样就无法通过最后修改时间来判断是否使用缓存
 * 2、某些文件的修改时间非常频繁，在秒下的时间内进行修改， last-modified只能精确到秒
 * 3、一些文件的最后修改时间改了，但是内容没发生变化
 * 4、如果同一样的文件位于多个CDN中，服务器上的内容虽然一样，但是修改时间不一样
*/

// 针对上面的问题， 引入 ETag（实体标签的缩写）(响应头中) / if-none-match (请求头中)


http.createServer(function(req,res){
  const {pathname} = url.parse(req.url, true)
  const filepath = path.join(__dirname,pathname)
  // fs.stat 获取文件信息
  fs.stat(filepath, (err, stat) => {
    if(err) {
      return sendError(req,res)
    } else {
      // 获取最后修改时间
      const ifModifiedSince = req.headers['if-modified-since'];
      const lastModified = stat.ctime.toGMTString()

      // 与 ETag对应的
      const ifNoneMatch = req.headers['if-none-match']
      // 计算一次文件的hash
      // 下面这两行代码需要优化， 如果文件 10G ,那么md5的计算量会比较大
      // const file = fs.readFileSync(filepath)
      // const Etag = crypto.createHash('md5').update(file).digest('hex')
      // if(lastModified === ifModifiedSince || ifNoneMatch === Etag) {
      //   res.writeHead(304)
      //   res.end()
      // } else {
      //   return send(req,res, filepath, stat, Etag)
      // }


      // 优化md5计算量
      // 每次读取64kb大小的文件, 不需要一次把10G读入内存
      const out = fs.createReadStream(filepath)
      const md5 = crypto.createHash('md5')
      out.on('data', function(data) {
        md5.update(data)
      })
      // 文件读取结束之后
      out.on('end', function () {
        const Etag = md5.digest('hex')
        if(lastModified === ifModifiedSince || ifNoneMatch === Etag) {
          res.writeHead(304)
          res.end()
        } else {
          return send(req,res, filepath, stat, Etag)
        }
      })

      // 但是还是很慢， 因此还得另外一种思路
    }
  })
}).listen(8080)

function send(req,res, filepath, stat, etag) {
  res.setHeader('Content-Type', mime.getType())
  // 把最后修改时间发送给客户端之后，客户端会把此时间保存起来，下次再获取此资源时会把时间带回来
  res.setHeader('Last-Modified', stat.ctime.toGMTString())

  // Etag ,通过文件内容 + hash算法计算得来 crypto.createHash('md5').update(file).digest('hex')
  res.setHeader('ETag', etag)
  fs.createReadStream(filepath).pipe(res)
}

function sendError(req,res) {
  res.end('Not Found')
}

// 强缓存
// res.setHeader('Cache-Control', "max-age=30")

// 防盗链
const whiteList = ['192.168.xx.xxx']
 function reject_url(req,res) {
   const refer = req.headers['referer'] || req.headers['refer']
   if(refer) {
     const currentHostname = url.parse(refer,true).hostname;
     const referHostName = url.parse(req.url, true).hostname;
     if(referHostName === currentHostname || whiteList.includes(referHostName)) {
      //  send(req,res)
     }
   }
 }