const test = jQuery('.test')
test.addClass('red').addClass('blue') // 函数里面的this 就是获取的元素

test.removeClass('red blue')

const child = test.find('.child')

child.addClass('blue')

test.addClass('green')