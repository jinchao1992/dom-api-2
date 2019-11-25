import { strToArray } from './utils'
window.$ = function (selecror) {
  let elements = document.querySelectorAll(selecror);
  return {
    addClass(className) {
      className = strToArray(className, ' ')
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(...className)
      }
      return this
    },
    removeClass(className) {

    }
  }
}