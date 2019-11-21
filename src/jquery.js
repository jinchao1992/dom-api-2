window.jQuery = function (selectorOrArray) {
  let elements
  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray)
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray
  }
  // const api = {...} return api 简写为下面的
  return {
    addClass(className) {
      className = className.trim()
      const arr = className.split(' ')
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(...arr)
      }
      return this
    },
    removeClass(className) {
      className = className.trim()
      const arr = className.split(' ')
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove(...arr)
      }
      return this
    },
    find(selector) {
      let array = []
      for (let i = 0; i < elements.length; i++) {
        const elements2 = Array.from(elements[i].querySelectorAll(selector))
        array = array.concat(elements2)
      }
      // console.log(this) // 此时的this依然是最外层函数调用返回的对象
      // 这里的 return jQuery(array) 是创建新的作用域，防止跟之前API的相互污染
      return jQuery(array)
    }
  }
}