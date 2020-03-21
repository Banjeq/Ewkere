
let str = 'a1b c34d x567z'
let res = str.match(/\d+/g, '!')
var summ = 0
for (var i = 0; i < res.length; i++){ 
  summ += Number.parseInt(res[i])
}
console.log(summ)