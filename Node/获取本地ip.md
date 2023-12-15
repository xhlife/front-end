
```ts
import os from "os"

export function isVmNetwork(mac:string): boolean {
  // 常见的虚拟网卡 MAC地址和厂商
  const vmNetwork = [
    "00:05:69", //vmware1
    "00:0C:29", //vmware2
    "00:50:56", //vmware3
    "00:1C:42", //parallels1
    "00:03:FF", //microsoft virtual pc
    "00:0F:4B", //virtual iron 4
    "00:16:3E", //red hat xen , oracle vm , xen source, novell xen
    "08:00:27", //virtualbox
    "00:00:00", // VPN
  ]
  for (let i = 0; i < vmNetwork.length; i++) {
    let mac_per = vmNetwork[i]
    if(mac.startsWith(mac_per)) {
      return true
    }
  }
  return false
}

export function getIp(): string | undefined {
  let netDict = os.networkInterfaces()

  for (const devName in netDict) {
    let netList = netDict[devName] || [];
    for (var i = 0; i < netList.length; i++) {
        let { address, family, internal,mac } = netList[i]
        let isvm = isVmNetwork(mac);
        if (family === 'IPv4' && address !== '127.0.0.1' && !internal && !isvm) {
            return address;
        }
    }
  }
}
```
## 场景
### qiankun.js微前端下，自动根据ip填写应用本地开发的ip地址

#### 步骤一、修改vue.config.js

```js
chainWebpack(config) {
    config.plugin("define").tap((args) => {
      const ip = getIpAddress();
      if (ip) {
        // 将 ip挂到process.env上
        args[0]["process.env"].VUE_APP_CURRENT_IP = `"${getIpAddress()}"`;
      } else {
        args[0]["process.env"].VUE_APP_CURRENT_IP = "localhost";
      }
      return args;
    });
}
```

#### 步骤二、修改main.js中注册子应用的代码
```js
const ip = process.env.VUE_APP_CURRENT_IP;
registerMicroApps([
  /*** 应用1   ***/
  {
    name: "app-consult",
    entry:
      process.env.NODE_ENV === "production"
        ? "/app-consult/"
        : `http://${ip}:9528/app-consult/`,
    container: "#subAppWrapper",
    // 应用路由前缀
    activeRule: "/zgyhweb",
    // 将vuex数据提供给子应用
    props: { data: GlobalData },
  },
]);
```
