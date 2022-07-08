// 数组转树
function listToTree(list) {
  if (!list.length) return []
  // 先找到顶级节点
  let topNode = {}
  const treeMap = new Map()
  list.forEach(dir => {
    if (dir.parent === null || !dir.parent) {
      topNode = dir
    }
    // 初始化children字段，用于存储 子目录
    dir.children = []
    treeMap.set(dir.code, dir)
  })
  list.forEach(dir => {
    // 如果是顶级节点那么不处理
    if (!dir.parent) return
    // 如果不是的话，那么找到上级目录，并往children中添加
    if (treeMap.has(dir.code)) {
      const parent = treeMap.get(dir.parent)
      if (parent) {
        parent.children.push(dir)
      }
    }
  })
  const result = []
  // treeMap 中的存储的父节点，就是最终的tree
  const tree = treeMap.get(topNode.code)
  if (tree) result[0] = tree
  return result
}

const a = [
  {
    id: "2c920716814d8a4c01814da252ed0ee0",
    tenantId: "omsuser",
    parent: "000001000032",
    name: "cccccccccc",
    status: "ENABLE",
    code: "000001000032000001"
  },
  {
    id: "2c9207168044fde2018045d4f3c9123f",
    tenantId: "omsuser",
    parent: "000001000017000001",
    name: "低三组",
    status: "ENABLE",
    managerId: "1001",
    code: "000001000017000001000001"
  },
  {
    id: "2c920716814d8a4c01814da219b60ec9",
    tenantId: "omsuser",
    parent: "000001",
    name: "cccccc",
    status: "ENABLE",
    managerId: "4028818f7dda798d017ddc3ffeb20030",
    code: "000001000032"
  },
  {
    id: "1001",
    tenantId: "omsuser",
    name: "总裁办",
    status: "ENABLE",
    managerId: "oms001",
    code: "000001"
  },
  {
    id: "4028818f7dda798d017dda798d550000",
    tenantId: "omsuser",
    parent: "000001000001",
    name: "市场组1",
    status: "ENABLE",
    managerId: "4028818f7dc61c36017dc61c36b60000",
    code: "000001000001000001"
  },
  {
    id: "1002",
    tenantId: "omsuser",
    parent: "000001",
    name: "市场部",
    status: "ENABLE",
    managerId: "4028818f7dc6e371017dc6f6eed102ca",
    code: "000001000001"
  },
  {
    id: "2c92071680447cb7018044b9509a0460",
    tenantId: "omsuser",
    parent: "000001000017",
    name: "低二组",
    status: "ENABLE",
    managerId: "2c92071680447cb7018044b7e3410448",
    code: "000001000017000001"
  },
  {
    id: "4028807b7db66d72017db7f518a00003",
    tenantId: "omsuser",
    parent: "000001",
    name: "这是一个测试部门",
    status: "ENABLE",
    managerId: "4028818f7dc5fdf9017dc6177cb7000c",
    code: "000001000011"
  },
  {
    id: "2c920716814374010181465c87d841b9",
    tenantId: "omsuser",
    parent: "000001",
    name: "测试测试测",
    status: "ENABLE",
    managerId: "2c920716811eda3601811edc8027016d",
    code: "000001000031"
  },
  {
    id: "2c92071680e598f50180e5c0533b134a",
    tenantId: "omsuser",
    parent: "000001",
    name: "总裁1部",
    status: "ENABLE",
    managerId: "2c920716812209820181220ef7220317",
    code: "000001000019"
  },
  {
    id: "2c920716813c18d701813c2a7ab80bea",
    tenantId: "omsuser",
    parent: "000001000019000005",
    name: "嚯嚯嚯嚯嚯",
    status: "ENABLE",
    managerId: "2c920716812209820181220ef7220317",
    code: "000001000019000005000001"
  },
  {
    id: "2c92071680e598f50180e5d5cc581f12",
    tenantId: "omsuser",
    parent: "000001000018",
    name: "123",
    status: "ENABLE",
    managerId: "2c92071680d9e2690180da4719105356",
    code: "000001000018000001"
  },
  {
    id: "2c92071680d9e2690180da466e7852e8",
    tenantId: "omsuser",
    parent: "000001",
    name: "总裁2号",
    status: "ENABLE",
    managerId: "oms001",
    code: "000001000018"
  },
  {
    id: "2c92071680447cb7018044b00b2203d3",
    tenantId: "omsuser",
    parent: "000001000016",
    name: "高二组",
    status: "ENABLE",
    managerId: "2c92071680447cb7018044a93e4a0397",
    code: "000001000016000001"
  },
  {
    id: "2c92071680447cb7018044a8079f0370",
    tenantId: "omsuser",
    parent: "000001",
    name: "低一组",
    status: "ENABLE",
    managerId: "oms001",
    code: "000001000017"
  },
  {
    id: "2c92071680447cb7018044a73335036c",
    tenantId: "omsuser",
    parent: "000001",
    name: "高一组",
    status: "ENABLE",
    managerId: "oms001",
    code: "000001000016"
  },
  {
    id: "4028818f7dda798d017dda9ea2db0008",
    tenantId: "omsuser",
    parent: "000001",
    name: "黑黑部",
    status: "ENABLE",
    managerId: "oms001",
    code: "000001000007"
  },
  {
    id: "4028818f7dc7a970017dc7abee520008",
    tenantId: "omsuser",
    parent: "000001",
    name: "管理员一团",
    status: "ENABLE",
    managerId: "4028818f7dc637c8017dc637c8110000",
    code: "000001000010"
  },
  {
    id: "4028818f7dc7a970017dc7a9709e0000",
    tenantId: "omsuser",
    parent: "000001",
    name: "453436",
    status: "ENABLE",
    managerId: "oms001",
    code: "000001000012"
  },
  {
    id: "1003",
    tenantId: "omsuser",
    parent: "000001",
    name: "客户成功",
    status: "ENABLE",
    managerId: "oms001",
    code: "000001000002"
  },
  {
    id: "1004",
    tenantId: "omsuser",
    parent: "000001",
    name: "猎企伙伴部",
    status: "ENABLE",
    managerId: "oms001",
    code: "000001000003"
  },
  {
    id: "1005",
    tenantId: "omsuser",
    parent: "000001",
    name: "客服部",
    status: "ENABLE",
    managerId: "oms001",
    code: "000001000004"
  },
  {
    id: "1006",
    tenantId: "omsuser",
    parent: "000001",
    name: "审查部门",
    status: "ENABLE",
    managerId: "oms001",
    code: "000001000005"
  },
  {
    id: "omsuser",
    tenantId: "omsuser",
    parent: "000001",
    name: "oms运营",
    status: "ENABLE"
  },
  {
    id: "4028818f7d4c551b017d4d0705e20004",
    tenantId: "omsuser",
    parent: "000005",
    name: "oms运营组",
    status: "ENABLE",
    managerId: "oms00112",
    code: "000005000001"
  }
]
const res = listToTree(a)
