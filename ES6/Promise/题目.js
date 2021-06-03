let p = new Promise(resolve =>{
  console.log(1);
  setTimeout(() => {
    resolve(2)
  }, 1000);
})
console.log(3);
setTimeout(() => {
  console.log(4);
}, 1000);
setTimeout(() => {
  console.log(5);
}, 0);
p.then( val => {
  console.log(val);
})
setTimeout(() => {
  console.log(6);
}, 3000);


// 1 3 5 2 4 6