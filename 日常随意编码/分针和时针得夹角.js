function countAngle(hour,minute){
  const oneHourAngle = 30
  const oneHourMinute = 60
  const oneCircle = 360
  let hourCer = hour > 12 ? hour - 12 : hour
  let hourAngle = hourCer * oneHourAngle
  let minuteAngle =  minute / oneHourMinute * oneCircle
  let res = Math.abs(hourAngle - minuteAngle)
  res > 180 ? res = oneCircle - res : null
  // 因为上面的计算 可能会导致 分针一小格得到 6.00000000xx的小数
  return Number(res.toFixed())
}

console.log(countAngle(3,15));
console.log(countAngle(3,30));

console.log(countAngle(18,31));

console.log(countAngle(20,31));