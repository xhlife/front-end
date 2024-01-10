安装 gcc | gcc 是 linux 下的编译器，它可以编译 C,C++,Ada,Object C 和 Java 等语言，nginx 是 c 写的。

```sh
yum -y install gcc
```

安装 pcre、pcre-devel | pcre 是一个 perl 库，包括 perl 兼容的正则表达式库，nginx 的 http 模块使用 pcre 来解析正则表达式，所以需要安装 pcre 库

```sh
yum install -y pcre pcre-devel
```

安装 zlib | zlib 库提供了很多种压缩和解压缩方式 nginx 使用 zlib 对 http 包的内容进行 gzip，所以需要安装

```sh
yum install -y zlib zlib-devel
```

安装 openssl | 是用于传输层安全（TLS）协议（以前称为安全套接字层（SSL）协议）的健壮、商业级、功能全面的开源工具包。协议实现基于一个完整的通用密码库，也可以独立使用。

```sh
yum install -y openssl openssl-devel
```

下载 nginx 安装包， 解压->make->启动服务

```sh
cd /usr/local
mkdir nginx-tar-gz
cd nginx-tar-gz
wget http://nginx.org/download/nginx-1.9.9.tar.gz
tar -zxvf nginx-1.9.9.tar.gz


./configure
make

make install


cd /usr/local/nginx

cd /usr/local/nginx/sbin

./nginx

ps -ef | grep nginx
```
