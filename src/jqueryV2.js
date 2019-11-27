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

  // console.log(elements)

  function createElement(str) {
    const container = document.createElement('template')
    container.innerHTML = str.trim()
    return container.content.firstChild
  }

  return {
    oldApi: elements.oldApi,
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
      // 这里的返回相当于是重新生成一层api返回
      array.oldApi = this
      return jQuery(array)
    },
    end() {
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
}