// -d 静态文件目录， -o -- host 主机 -p --port 端口号

const yargs = require('yargs')
const Server = require('../src/app.js')
const argv = yargs.option('d', {
  alias: 'root',
  demand: false,
  default: 'localhost',
  description: '静态文件根目录'
}).option('o', {
  alias: 'host',
  demand: false,
  default: 'localhost',
  description: '请配置监听的主机'
}).option('p', {
  alias: 'port',
  demand: false,
  type: 'number',
  default: 8080,
  description: '请配置监听的端口号'
}).usage('xh-server [options]')
  .example('sh-server -d / -p 9090 -o localhost')
  .help('h').argv
// usage 用法示例  options 参数配置 

// argv = {d,root,o,host,p,host}

const server = new Server(argv)

