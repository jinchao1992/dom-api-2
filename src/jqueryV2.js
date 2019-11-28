import {
  strToArray,
  isArray
} from './utils'
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
  const api = Object.create(jQuery.prototype) // 作用在于创建一个对象，把对象的__proto__ 指向了括号里的内容
  Object.assign(api, {
    elements,
    oldApi: selectorOrArrayOrTemplate
  })
  return api
}

jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  get(index) {
    return this.elements[index]
  },
  appendTo(node) {
    if (node instanceof Element) {
      this.each(el => {
        node.appendChild(el)
      })
    } else if (node.jquery) {
      this.each(el => {
        return node.get(0).appendChild(el)
      })
    }
  },
  append(children) {
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLCollection) {
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[i]);
      }
    } else if (children.jquery) {
      children.each(node => this.get(0).appendChild(node));
    }
  },
  addClass(className) {
    const elements = this.elements
    className = strToArray(className, ' ')
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add(...className)
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
  index() {
    const childrens = this.parent().children().print()
    const elements = this.elements
    for (let i = 0; i < childrens.length; i++) {
      for (let j = 0; j < elements.length; j++) {
        if (childrens[i] === elements[j]) {
          return i
          break
        }
      }
    }
  },
  next() {
    let array = []
    this.each(item => {
      let x = item.nextSibling
      while (x && x.nodeType === 3) {
        x = x.nextSibling
      }
      if (x && array.indexOf(x) === -1) {
        array.push(x)
      }
    })
    return jQuery(array)
  },
  prev() {
    let array = []
    this.each(item => {
      if (item.previousElementSibling && array.indexOf(item.previousElementSibling) === -1) {
        array.push(item.previousElementSibling)
      }
    })
    return jQuery(array)
  },
  siblings() {
    const childrens = this.parent().children().print()
    const array = childrens.filter((item, index) => {
      return index !== this.index()
    })
    return jQuery(array)
  }
}