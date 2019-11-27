function strToArray(str, val) {
  return str.trim().split(val)
}

// 判断是不是数组
function isArray(obj) {
  const str = Object.prototype.toString.call(obj)
  return str === '[object Array]' ? true : false
}

export {
  strToArray,
  isArray
}