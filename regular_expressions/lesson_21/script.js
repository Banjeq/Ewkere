
let str = '12 34 56 78';
let res = str.replace(/(\d)(\d)/g, '$2$1');

console.log(res)