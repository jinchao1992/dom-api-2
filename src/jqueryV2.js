import { strToArray } from './utils'
window.$ = function (selector) {
  let elements = document.querySelectorAll(selector);
  return {
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
      console.log(array)
    }
  }
}