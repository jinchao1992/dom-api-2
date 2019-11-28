import { strToArray, isArray } from './utils'
window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements
  if (typeof selectorOrArrayOrTemplate === 'string') {
    if (selectorOrArrayOrTemplate[0] === '<') {
      // 创建div
      elements = [createElement(selectorOrArrayOrTemplate)]
    } else {
      // 查找
      elements = document.querySelectorAll(selectorOrArrayOrTemplate)
    }
  } else {
    elements = selectorOrArrayOrTemplate
  }

  function createElement(str) {
    const container = document.createElement('template')
    container.innerHTML = str.trim()
    return container.content.firstChild
  }
  // 此句话的作用在于创建一个对象把它的__proto__ 指向了括号里的东西
  const api = Object.create(jQuery.prototype)
  Object.assign(api, {
    elements,
    oldApi: selectorOrArrayOrTemplate.oldApi
  })
  return api
}

jQuery.prototype = {
  constructor: jQuery,
  // jQuery: true,
  get(index) {
    return this.elements[index]
  },
  addClass(className) {
    const elements = this.elements
    className = strToArray(className, ' ')
    for (let i = 0; i < elements.length; i++) {
      this.elements[i].classList.add(...className)
    }
    return this
  },
  removeClass(className) {
    const elements = this.elements
    className = strToArray(className, ' ')
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(...className)
    }
    return this
  },
  find(selector) {
    const elements = this.elements
    let array = []
    for (let i = 0; i < elements.length; i++) {
      const items = Array.from(elements[i].querySelectorAll(selector))
      array = array.concat(items)
    }
    // 这里的返回相当于是重新生成一层api返回
    array.oldApi = this
    return jQuery(array)
  },
  end() {
    return this.oldApi
  },
  each(fn) {
    const elements = this.elements
    for (let i = 0; i < elements.length; i++) {
      fn.call(null, elements[i], i)
    }
    return this
  },
  print() {
    return this.elements
  },
  parent() {
    let array = []
    this.each((item, index) => {
      if (array.indexOf(item.parentNode) === -1) {
        array.push(item.parentNode)
      }
    })
    return jQuery(array)
  },
  children() {
    let array = []
    this.each(item => {
      array.push(...item.children)
    })
    return jQuery(array)
  },
  index(node) {
    const items = this.parent().print()
    for (let i = 0; i < items.length; i++) {
      const children = items[i].children
      for (let j = 0; j < children.length; j++) {
        if (children[j] === node) {
          return i
          break
        }
      }
    }
  }
}
