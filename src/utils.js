function strToArray(str, val) {
  return str.trim().split(val)
}

function isArray(obj) {
  const str = Object.prototype.toString.call(obj)
  return str === '[object Array]' ? true : false
}
export {
  strToArray,
  isArray
}