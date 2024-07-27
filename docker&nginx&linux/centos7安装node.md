### 安装nvm 

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

### 安装不同版本的node

```sh
nvm install 20
```

执行node 

```js
node -v
```
报错

```js
node: /lib64/libm.so.6: version `GLIBC_2.27' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.25' not found (required by node)
node: /lib64/libc.so.6: version `GLIBC_2.28' not found (required by node)
node: /lib64/libstdc++.so.6: version `CXXABI_1.3.9' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.20' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by node)
```

### 更新 GLIBC

```sh
wget http://ftp.gnu.org/gnu/glibc/glibc-2.28.tar.gz
tar xf glibc-2.28.tar.gz 
cd glibc-2.28/ && mkdir build  && cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
```

### 可能出现的错误

上步更新glibc 可能会发生错误参考下面的错误，如果更新 GLIBC，没有错误 直接下一步: 继续更新。

```sh
configure: error: 
*** These critical programs are missing or too old: make bison compiler
*** Check the INSTALL file for required versions.
```

解决办法：升级gcc与make

```sh
# 升级GCC(默认为4 升级为8)</span>
yum install -y centos-release-scl
yum install -y devtoolset-8-gcc*
mv /usr/bin/gcc /usr/bin/gcc-4.8.5
ln -s /opt/rh/devtoolset-8/root/bin/gcc /usr/bin/gcc
mv /usr/bin/g++ /usr/bin/g++-4.8.5
ln -s /opt/rh/devtoolset-8/root/bin/g++ /usr/bin/g++

# 升级 make(默认为3 升级为4)
wget http://ftp.gnu.org/gnu/make/make-4.3.tar.gz
tar -xzvf make-4.3.tar.gz && cd make-4.3/
./configure  --prefix=/usr/local/make
make && make install
cd /usr/bin/ && mv make make.bak  # 备份原本的make版本
ln -sv /usr/local/make/bin/make /usr/bin/make
```

继续更新 glibc

```sh
cd /root/glibc-2.28/build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
```
还是报错bison太旧

```sh
configure: error: 
*** These critical programs are missing or too old: bison
*** Check the INSTALL file for required versions.
```

看看bison版本多少

```sh
bison -v
-bash: bison: 未找到命令
```

更新/安装bison ，然后继续更新glibc

```sh
yum install -y bison
cd /root/glibc-2.28/build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin

yum install -y bison

```


### 继续更新

```sh
make && make install
```

### 验证node

```sh
node -v

```

如果还是出现下面的问题，要连接新的动态库

```sh
node -v
node: /lib64/libstdc++.so.6: version `CXXABI_1.3.9' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.20' not found (required by node)
node: /lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by node)
```

用下面命令查看

```sh
strings /usr/lib64/libstdc++.so.6 | grep CXXABI
```

更新libstdc++.so.6.0.26

```sh
# 更新lib libstdc++.so.6.0.26
 
wget https://cdn.frostbelt.cn/software/libstdc%2B%2B.so.6.0.26
 
 
# 替换系统中的/usr/lib64
cp libstdc++.so.6.0.26 /usr/lib64/

cd /usr/lib64/

ln -snf ./libstdc++.so.6.0.26 libstdc++.so.6
```

验证

```sh
node -v
```