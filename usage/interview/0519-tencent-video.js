/*
 * 5月19日 腾讯视频面试编程题
 */

/*
 * 第一题：formatNum
 * 编写formatNum函数，将数字格式化为金额格式，每三位加入逗号：
 * var money = 34782632
 * 使得调用money.formatNum()，输出"34,782,632"
 */
var money = 34782632

Number.prototype.formatNum = function () {
    let result = []
    let money = "" + this

    money.split('').reverse().forEach((v, i) => {
        if (i !== 0 && i % 3 === 0) {
            result.push(',')
        }
        result.push(v)
    })

    return result.reverse().join('')
}

console.log(money.formatNum())

/*
 * 第二题：实现函数f
 * 得到如下输出结果：
 * f(1).value == 1
 * f(1)(2).value == 5
 * f(1)(2)(3).value == 14
 * 找出规律，并支持对任意多个数进行计算。
 */

var f = function (n) {
    function add(n) {
        add.value += n * n
        return add
    }
    add.value = n * n
    return add
}

console.log(f(1).value)
console.log(f(1)(2).value)
console.log(f(1)(2)(3).value)

/*
 * 第三题：拓展console.log
 * 在每个输出前增加一个自增序号
 * console.log("foo") // 1: foo
 * console.log("bar") // 2: bar
 */

console.myLog = console.log
console.index = 1

console.log = function () {
    console.myLog(this.index++ + ':', ...arguments)
}

console.log('foo')
console.log('bar')
