const arr = new Array(5);

function insertRandom(n) {
  if(n < 0 ) return;
  const random = Math.floor(Math.random() * 31 + 2);
  if(arr.indexOf(random) === -1) {
    arr[n] = random;
    n--;
  }
  insertRandom(n)
}
insertRandom(arr.length - 1);
console.log(arr);