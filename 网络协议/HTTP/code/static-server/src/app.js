#!/usr/bin/env node
const config = require('./config.js')

const http = require('http')
const chalk = require('chalk')
const path = require('path')
const url  = require("url")
const fs = require('fs')
const mime = require('mime')
const {promisify} = require('util')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const handlebars = require('handlebars')
// 每一个debug实例都有一个名字，需要设置环境变量才会生效 window 下 set DEBUG=static:app  mac/linux下 export DEBUG=static:*
const debug = require('debug')('static:app')

// 编译模板，得到一个渲染的方法，返回后传入实际的数据就可以得到渲染后的html
function list() {
  const tmlp = fs.readFileSync(path.resolve(__dirname, 'template', 'list.html'),'utf-8')
  return handlebars.compile(tmlp)
}
class Server {
  constructor(argv) {
    this.config = Object.assign({},config, argv)
    this.server = http.createServer()
    this.start()
    this.list = list()
  }
  start() {
    this.server.on('request', this.request.bind(this))
    this.server.listen(this.config.port, () => {
      let url = `${this.config.host}:${this.config.port}`
      debug('server started at ' + chalk.green(url));
    })
  }
  async request(req, res) {
    const {pathname} = url.parse(req.url,true)
    const filepath =  path.join(this.config.root, pathname)
    if(pathname === '/favicon.ico') return this.sendError(req,res)
    try {
      const statObj = await stat(filepath)
      if(statObj.isDirectory()) { // 如果是目录的
        
        let files = await readdir(filepath)
        files = files.map(file => ({
          name: file,
          url: path.join(pathname,file)
        }))
        // 模版引擎编写
        let html = this.list({
          title: pathname,
          files
        })
        res.setHeader('Content-Type', "text/html")
        res.end(html)
      } else {
        this.sendFile(req,res,filepath, statObj)
      }
    } catch (error) {
      console.log(error);
      this.sendError(req,res)
    }

  }
  sendFile(req, res,filepath, statObj) {
    res.setHeader('Content-Type', mime.getType(filepath))
    fs.createReadStream(filepath).pipe(res)
  }

  sendError(req,res) {
    res.statusCode = 500
    res.end('there is something wrong in the server! please try later!')
  }
}
// new Server()

module.exports = Server
