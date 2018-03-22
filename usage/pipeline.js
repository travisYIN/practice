/*
 * 将操作最小化——方便调试
 * 用pipeline将最小化的操作组合成为函数
 */

function addOne (a) { return a + 1 }
function multiTwo (a) { return a * 2 }
function divThree (a) { return a / 3 }
function toString (a) { return a + '' }
function split (a) { return a.split('') }

const pipeline = (...funcs) =>
  val => funcs.reduceRight((b, a) => a(b), val)
const testForCompose = pipeline(split, toString, addOne, multiTwo, divThree)

// => ["4", "4", "5"]
split(toString(addOne(multiTwo(divThree(666)))))
testForCompose(666)
