
### 创建项目目录



### mod初始化

```sh
go mod init $module_name  # $module_name可以和目录不一致
```

这样就会生成go.mod文件

文件的内容简单说明

go.mod主要是以下内容： module、go、require、replace、exclude等， 具体文档
[https://golang.ac.cn/doc/modules/gomod-ref](https://golang.ac.cn/doc/modules/gomod-ref)


```sh
module example.com/mymodule

go 1.14

require (
    example.com/othermodule v1.2.3
    example.com/thismodule v1.2.3
    example.com/thatmodule v1.2.3
)

replace example.com/thatmodule => ../thatmodule
exclude example.com/thismodule v1.3.0
```

### go mod tidy

自动检测并安装相关依赖， 如果没有用到的依赖，会在mod文件中的require删除
