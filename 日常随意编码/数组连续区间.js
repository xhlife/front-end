function continuousInterval(arr) {
  if (!Array.isArray(arr)) return;
  if (arr.length === 1) return;
  if (arr.length === 2) {
    if (arr[0] === arr[1] - 1) {
      return arr;
    } else return [...arr.split(',')];
  }
  let res = [];
  let idxStack = [arr[0]];
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    // 末端处理
    if (i + 2 === len) {
      if (arr[i] + 1 === arr[i + 1]) {
        idxStack.push(arr[i + 1]);
        res.push([...idxStack]);
      } else {
        res.push([...idxStack]);
        res.push([arr[i + 1]]);
      }
      break;
    }
    if (arr[i] + 1 === arr[i + 1] || arr[i] === arr[i + 1]) {
      continue;
    } else {
      arr[i] === idxStack[0] ? null : idxStack.push(arr[i]);
      res.push([...idxStack]);
      idxStack.length = 0;
      idxStack.push(arr[i + 1]);
    }
  }
  return res;
}

let res = continuousInterval([1, 2, 3, 5, 9, 10, 11, 12]);
let res1 = continuousInterval([
  1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 55, 56, 57, 59, 61,
]);
console.log(res); // [[1,3], [5], 9,12]
console.log(res1); // [[1,6], [9, 12], [55, 57], [59], [61]]

export default {};
