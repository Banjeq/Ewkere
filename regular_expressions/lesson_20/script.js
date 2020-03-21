
let str = '31.12.2025'
let res = str.match(/(\d{1,2})\.(\d{1,2})\.(\d{1,4})/);

console.log('  pocket1 - '+res[1]+'  pocket2 - '+res[2]+'  pocket3 -'+res[3])