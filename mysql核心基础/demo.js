let arr = '1_12_da'.split('_');
let str = [];
arr.map(item => {
    str.push(parseInt(item));
});
console.log(str);