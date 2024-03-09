### mac 端 nginx的暗转、启动和关闭

安装
```sh
brew install nginx
```

启动

```sh
sudo nginx
```

重启

```sh
nginx -s reopen            # 重启 Nginx
```

关闭

```sh
# 从容停止服务
nginx -s quit

# 立刻停止服务
nginx -s stop

# systemctl 停止
systemctl stop nginx.service

# killall 方法杀死进程
killall nginx 

```

### 搭建静态服务器

```sh
server {
  listen 6760;
  server_name localhost;

  root /Users/xh/MySpace/machineroom_3d/dist;
  index index.html;

  location / {
    # $uri 包含了请求行的URI，但不包括协议和主机名部分 
    # 例如，如果完整的请求URL是 http://example.com/some/path?query=string，
    # 那么 $uri 的值就是 /some/path?query=string。
    try_files $uri $uri/ /index.html;

    # try_files指令尝试按照列出的顺序返回文件。首先，它会检查是否存在与uri对应的文件。
    # 如果存在，就返回该文件。如果不存在，它会尝试将请求作为目录来处理（即检查uri对应的文件。# 如果存在，就返回该文件。如果不存在，它会尝试将请求作为目录来处理（即检查‘uri/）。
    # 如果这也不成功，它将回退到服务器的 /index.html` 文件。
  }
}
```

### 跨域代理

```sh

server {
  ...
  location /api/ {
    proxy_pass http://backend-api-url;  # Replace with your backend API URL
    proxy_set_header Host $host; # 客户端请求的主机头字段值，以方便后端服务器知道客户端请求的主机
    proxy_set_header X-Real-IP $remote_addr; # 客户端的IP地址。 代表发起请求的客户端的ip地址。
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; # 一个常用的http请求头，用于传递客户端的原始ip地址
    proxy_set_header X-Forwarded-Proto $scheme; # 协议方案， 如： http或https
  }

    # CORS configuration for API requests
  location ~ /api/ {
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Sinces,Cache-Control,Content-Type,Range';
    add_header 'Access-Control-Max-Age' 1728000;
    add_header 'Content-Type' 'text/plain; charset=utf-8';
    add_header 'Content-Length' 0;
    return 204;
  }
  ...
}
```

### 一篇文章和一个例子

[nginx模块详解文章](https://www.runoob.com/w3cnote/nginx-install-and-config.html)

下面的nginx.conf简单的实现nginx在前端做反向代理服务器的例子，处理js、png等静态文件，jsp等动态请求转发到其它服务器tomcat：

```sh
user  www www;
worker_processes  2;
error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;
pid        logs/nginx.pid;
events {
    use epoll;
    worker_connections  2048;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile        on;
    # tcp_nopush     on;
    keepalive_timeout  65;
  # gzip压缩功能设置
    gzip on;
    gzip_min_length 1k;
    gzip_buffers    4 16k;
    gzip_http_version 1.0;
    gzip_comp_level 6;
    gzip_types text/html text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on;

  # http_proxy 设置
    client_max_body_size   10m;
    client_body_buffer_size   128k;
    proxy_connect_timeout   75;
    proxy_send_timeout   75;
    proxy_read_timeout   75;
    proxy_buffer_size   4k;
    proxy_buffers   4 32k;
    proxy_busy_buffers_size   64k;
    proxy_temp_file_write_size  64k;
    proxy_temp_path   /usr/local/nginx/proxy_temp 1 2;
  # 设定负载均衡后台服务器列表 
    upstream  backend  { 
              #ip_hash; 
              server   192.168.10.100:8080 max_fails=2 fail_timeout=30s ;  
              server   192.168.10.101:8080 max_fails=2 fail_timeout=30s ;  
    }
  # 很重要的虚拟主机配置
    server {
        listen       80;
        server_name  itoatest.example.com;
        root   /apps/oaapp;
        charset utf-8;
        access_log  logs/host.access.log  main;
        #对 / 所有做负载均衡+反向代理
        location / {
            root   /apps/oaapp;
            index  index.jsp index.html index.htm;
            proxy_pass        http://backend;  
            proxy_redirect off;
            # 后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header  Host  $host;
            proxy_set_header  X-Real-IP  $remote_addr;  
            proxy_set_header  X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;

        }
        #静态文件，nginx自己处理，不去backend请求tomcat
        location  ~* /download/ {  
            root /apps/oa/fs;  

        }
        location ~ .*/.(gif|jpg|jpeg|bmp|png|ico|txt|js|css)$   
        {   
            root /apps/oaapp;   
            expires      7d; 
        }
           location /nginx_status {
            stub_status on;
            access_log off;
            allow 192.168.10.0/24;
            deny all;
        }
        location ~ ^/(WEB-INF)/ {   
            deny all;   
        }
        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
  ## 其它虚拟主机，server 指令开始
}

```