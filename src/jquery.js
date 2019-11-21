window.jQuery = function (selectorOrArray) {
  let elements
  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray)
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray
  }
  // const api = {...} return api 简写为下面的
  return {
    oldApi: selectorOrArray.oldApi,
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
      array.oldApi = this
      return jQuery(array)
    },
    end() {
      // 此时的 this 依然变成了新的api也就是操作find时返回的新创建的api
      return this.oldApi
    },
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i)
      }
      return this // 这里的 this 还是外层函数调用返回的对象
    },
    parent() {
      const array = []
      this.each((item) => {
        if (array.indexOf(item.parentNode) === -1) {
          array.push(item.parentNode)
        }
      });
      return jQuery(array)
    },
    print() {
      return elements
    },
    children() {
      const array = []
      this.each(item => {
        array.push(...item.children)
      })
      return jQuery(array)
    }
  }
}