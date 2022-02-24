var chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; // 中文字符

var chnUnitSection = ['', '万', '亿', '万亿', '亿亿']; // 节单位

var chnUnitChar = ['', '十', '百', '千'];

function SectionToChinese(section) {
  var strIns = '',
    chnStr = '';
  var unitPos = 0;
  var zero = true;
  while (section > 0) {
    var v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}
function NumberToChinese(num) {
  var unitPos = 0;
  var strIns = '',
    chnStr = '';
  var needZero = false;
  if (num === 0) {
    return chnNumChar[0];
  }
  while (num > 0) {
    var section = num % 10000; // 以万作为节点 进行取余
    // 比如 100009809 % 10000 得到 9808
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr;
    }
    // 将 section（以万作为节点的一部分）交给 SectionToChinese处理
    strIns = SectionToChinese(section);
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
    chnStr = strIns + chnStr;
    needZero = section < 1000 && section > 0;
    num = Math.floor(num / 10000);
    unitPos++;
  }

  return chnStr;
}

const a = 10009908;
const b = 999;

const c = 99091023400043;
console.log(NumberToChinese(a));
console.log(NumberToChinese(b));
console.log(NumberToChinese(c));
