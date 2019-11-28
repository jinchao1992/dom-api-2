const $test = $('.test')
// $test.find('.child').addClass('red').end().addClass('blue')
// console.log($test.parent().print())
// $test.children()
// console.log($test.index())

// const $createDiv = $('<div>我是新创建的</div>')

const $foo = $('#foo')
// const $barIndex = $('#bar').index()
// const index = $foo.index()
// $('#baz').prev().addClass('red')
// $foo.siblings().addClass('red')

// $('<div class="xxx">我是新插入的</div>').appendTo($test)
const $div = $('<div class="xxx">创建的div</div>')
$test.append($div)
