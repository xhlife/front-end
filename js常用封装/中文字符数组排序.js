// 将含有中文字符的数组按照拼音排序


String.prototype.localeCompare // 原生字符串比较函数， 接受 'zh' 参数代表中文
["王成成","王峰", "蒋雪", "李明"].sort((a,b) => a.localeCompare(b, 'zh'))


