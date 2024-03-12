### supervisor

Supervisor是一个Python开发的client/server系统，可以管理和监控类UNIX操作系统上面的进程，可以同时启动、关闭多个进程，使用起来非常方便。

Supervisor有两个可执行程序，分别是supervisord和supervisorctl。其中，supervisord是Server部分，主要负责在后台启动、管理子进程、响应客户端命令等；supervisorctl是Client部分，主要负责和supervisord通信，发送各种控制命令1。


```sh
# supervisord：用于管理supervisor本身服务
[root@6641b2b40fd6 ~]# which supervisord
/usr/local/bin/supervisord


# supervisorctl：用于管理我们需要委托给superviso工具的服务
[root@6641b2b40fd6 ~]# which supervisorctl
/usr/local/bin/supervisorctl

```

### 编写需要被Supervisor管理的进程

Supervisor只能管理非dameon进程，像默认的redis为前台运行、Tomcat其实是 startup.sh shutdown.sh来调用catalina.sh进行后台运行的，默认catalina.sh为前台运行的程序，不能管理像Nginx一样的非dameon进程


#### tomcat为例
想要我们的应用被Supervisor管理，就需要在/etc/supervisord目录下编写配置文件，Tomcat案例如下：
```sh
vim /etc/supervisord.d/tomcat.conf
[program:tomcat]                                        #程序唯一名称
directory=/usr/local/tomcat                             #程序路径
command=/usr/local/tomcat/bin/catalina.sh run           #运行程序的命令
autostart=true                                          #是否在supervisord启动后tomcat也启动
startsecs=10                                            #启动10秒后没有异常退出，就表示进程正常启动了，默认为1秒
autorestart=true                                        #程序退出后自动重启,可选值：[unexpected,true,false]，默认为unexpected，表示进程意外杀死后才重启；意思为如果不是supervisord来关闭的该进程则认为不正当关闭，supervisord会再次把该进程给启动起来，只能使用该supervisorctl来进行关闭、启动、重启操作 
startretries=3                                          #启动失败自动重试次数，默认是3
user=root                                               #用哪个用户启动进程，默认是root
priority=999                                            #进程启动优先级，默认999，假如Supervisord需要管理多个进程，那么值小的优先启动
stopsignal=INT
redirect_stderr=true                                    #把stderr重定向到stdout标准输出，默认false
stdout_logfile_maxbytes=200MB                           #stdout标准输出日志文件大小，日志文件大小到200M后则进行切割，切割后的日志文件会标示为catalina.out1,catalina.out2,catalina.out3...，默认50MB
stdout_logfile_backups = 100                            #stdout标准输出日志文件备份数，保存100个200MB的日志文件，超过100个后老的将被删除，默认为10保存10个
stdout_logfile=/usr/local/tomcat/logs/catalina.out      #标准日志输出位置，如果输出位置不存在则会启动失败
stopasgroup=false                                       #默认为false,进程被杀死时，是否向这个进程组发送stop信号，包括子进程
killasgroup=false                                       #默认为false，向进程组发送kill信号，包括子进程
```


启动进程 使用supervisord管理启动后，当你使用/usr/local/tomcat/shutdown.sh或者kill $PID的时候，supervisord都会认为是意外关闭，会自动再次把进程拉起，除非是使用supervisord命令关闭。

```sh
#supervisord启动
supervisord -c /etc/supervisord.conf                    #启动supervisord进程，我们在配置文件中设置了 autostart=true 参数，在supervisord启动的时候 tomcat也随之启动
ps -ef|grep java  
```

### 程序管理

```sh
supervisorctl status tomcat                             #tomcat状态
supervisorctl stop tomcat                               #停止tomcat
supervisorctl start tomcat                              #启动tomcat
supervisorctl restart tomcat                            #重启tomcat
supervisorctl reoload tomcat 
```