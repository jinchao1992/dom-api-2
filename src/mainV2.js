const $test = $('.test')
const $child = $test.find('.child')
// $test.find('.child').addClass('red').addClass('blue').end().addClass('green')
const print = $child.each((item) => {
  item.classList.add('red')
}).print()
$child.parent()