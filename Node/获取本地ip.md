
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
``