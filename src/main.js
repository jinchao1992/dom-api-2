const test = jQuery('.test')
// test.addClass('red').addClass('blue') // 函数里面的this 就是获取的元素

// test.removeClass('red blue')

const child = test.find('.child')

// child.addClass('blue').addClass('yellow')

// test.each((item, i) => {
//   console.log(item)
//   console.log(`每一项test的下标为：${i}`)
// })

// const childParent = child.parent()
// childParent.addClass('redme')

// console.log(test.children().print())
child.addClass('red')