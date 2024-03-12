
### 启动服务
装的是mac端的 docker desktop 

所以可以直接通过客户端启动docker服务

```shell
open /Applications/Docker.app
```
然后可以通过进程拿到服务名， 启动和关闭

(launchctl是一个统一的服务管理框架，可以启动、停止和管理守护进程、应用程序、进程和脚本等)
```shell
launchctl list | grep docker

# 可以得到 docker服务名
# 例如 47498	0	application.com.docker.docker.16285192.16285197
```

启动和关闭
```shell
launchctl stop application.com.docker.docker.16285192.16285197 && launchctl start application.com.docker.docker.16285192.16285197
```

### 镜像和容器

Docker 容器Container： 镜像运行时的实体。镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体(也可以理解为镜像是代码，容器是代码运行后的结果)。容器可以被创建、启动、停止、删除、暂停等 。


像 nginx, node这些可能都是需要的镜像， docker拉取镜像命令

 ```shell 
 docker pull xxx
 # 可以的话带上 latest   
 # docker pull nginx:latest
 ```

平时开发的代码，可以理解为镜像，但是并不能直接被docker使用， 这种属于自定义镜像，需要docker file来定制

#### dockerfile

什么是 Dockerfile？
Dockerfile 是一个用来构建镜像的文本文件，文本内容包含了一条条构建镜像所需的指令和说明。

更多 dockerfile文件的使用看菜鸟教程(https://www.runoob.com/docker/docker-dockerfile.html)

