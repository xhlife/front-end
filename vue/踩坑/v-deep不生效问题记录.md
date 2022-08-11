​
## 环境： 

vue2.6.14

@vue/cli 5.0.4

在本地运行(npm run dev) v-deep是生效的，但是运维编辑脚本，自动部署到 docker时v-deep的样式都失效了

项目采用的是sass预处理， 同时cli采用的是dart-sass

"sass": "^1.34.1",
"sass-loader": "^8.0.2",

首先确认node版本与npm版本

### 本地node与npm

irving@IrvingdeMacBook-Pro ~ % node -v
v14.19.1
irving@IrvingdeMacBook-Pro ~ % npm -v
6.14.16
irving@IrvingdeMacBook-Pro ~ % 

docker上node与npm 版本

node -v
v14.17.1
npm -v
6.14.13

两者虽然有小区别但是同属一个大版本，应该是没有什么问题的。

### 最后
将sass-loader, vue，vue-template-compiler的版本都对比了一遍，发现是vue与vue-template-compiler 版本不一致导致。 因为有的同事用yarn, 有的用npm，所以没有package-lock.json 或者 yarn-lock.json。

因此在package.json中锁定vue 与 vue-template-compiler版本

原本package.json对应代码

dependencies: {
    ...
    "vue": "^2.6.14",
    ...
},
devDependencies: {
    ...
    "vue-template-compiler": "^2.6.14"
    ...
}

把 “^” 去掉 

dependencies: {
    ...
    "vue": "2.6.14",
    ...
},
devDependencies: {
    ...
    "vue-template-compiler": "2.6.14"
    ...
}

### package版本
在 package.json 中各种依赖的不同写法：

"dependencies": {
    "vant": "1.4.0",
    "lodash": "*",
    "react": "16.x",
    "elemnet-ui": "~5.4.6",
    "vue": "^2.3.3"
  }

"vant": "1.4.0":  固定版本号
"lodash": "*": 安装最新版本的依赖包（>=0.0.0）
"react": "16.x": 匹配主要版本（>=16.0.0 <17.0.0）
"react": "16.3.x": 匹配主要版本和次要版本（>=16.3.0 <16.4.0）
~: 当安装依赖时获取到有新版本时，安装到 x.y.z 中 z 的最新的版本。即保持主版本号、次版本号不变的情况下，保持修订号的最新版本, 比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0。
^: 当安装依赖时获取到有新版本时，安装到 x.y.z 中 y 和 z 都为最新版本。即保持主版本号不变的情况下，保持次版本号、修订版本号为最新版本, 比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0。
​
​