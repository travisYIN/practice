function convert (num, start, del) {
  var rest = (num - 1) % del + 1

  if (num == 0) {
    return ''
  } else if (num < 0) {
    return '-' + convert(-num, start, del)
  }

  return convert((num - rest) / del, start, del) + String.fromCharCode(start.charCodeAt(0) - 1 + rest)
}

function convertAtoZ (num) {
  var start = 'A',
      end = 'Z',
      del = end.charCodeAt() - start.charCodeAt() + 1

  return convert(num, start, del)
}

for (var i = -100; i < 100; i++) {
  console.log(i, convertAtoZ(i))
}