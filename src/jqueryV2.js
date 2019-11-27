import {
  strToArray,
  isArray
} from './utils'
window.$ = function (selectorOrArray) {
  let elements;
  if (!isArray(selectorOrArray)) {
    elements = document.querySelectorAll(selectorOrArray);
  } else {
    elements = selectorOrArray
  }
  return {
    oldApi: selectorOrArray.oldApi,
    addClass(className) {
      className = strToArray(className, ' ')
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(...className)
      }
      return this
    },
    removeClass(className) {
      className = strToArray(className, ' ')
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove(...className)
      }
      return this
    },
    find(selector) {
      let array = []
      for (let i = 0; i < elements.length; i++) {
        const items = Array.from(elements[i].querySelectorAll(selector))
        array = array.concat(items)
      }
      array.oldApi = this
      return $(array)
    },
    end() {
      // 此时的 this 依然变成了新的api也就是操作find时返回的新创建的api
      return this.oldApi
    },
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i)
      }
      return this
    },
    print() {
      return elements
    },
    parent() {
      const array = []
      this.each(item => {
        //  为什么需要判断？因为只需获取一个父级
        if (array.indexOf(item.parentNode) === -1) {
          array.push(item.parentNode)
        }
      })
      return $(array) // 这里的返回是为了链式操作
    }
  }
}