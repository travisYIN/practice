/*
 * 在1-9的数字间填充三种运算符
 * 每种运算符只能最多填充三次
 * 最后的结果需要得出100
 */

let operator = [0,0,0,0] // 记录加减乘除使用的个数
const NUMS = [1,2,3,4,5,6,7,8,9]
const OPERATOR = ['+', '-', '*']
const EVAL_ELE = {
	str: '1',
	plus: 0,
	minus: 0,
	mul: 0,
	total: 0
}
const RESULT = 100
const OPERATOR_NUM_LIMIT = 3

let evalArr = []
let resultArr = []

function getEvalChange(el, operator) {
	switch (operator) {
		case '+':
			return {
				str: el.str + operator + NUMS[el.total + 1],
				plus: el.plus + 1,
				total: el.total + 1
			}
			break
		case '-':
			return {
				str: el.str + operator + NUMS[el.total + 1],
				minus: el.minus + 1,
				total: el.total + 1
			}
			break
		case '*':
			return {
				str: el.str + operator + NUMS[el.total + 1],
				mul: el.mul + 1,
				total: el.total + 1
			}
			break
		default:
			break
	}
}

function checkOperatorNum (el) {
	return !(el.plus > OPERATOR_NUM_LIMIT || el.minus > OPERATOR_NUM_LIMIT || el.mul > OPERATOR_NUM_LIMIT)
}

// 初始化
OPERATOR.forEach(v => {
	evalArr.push(Object.assign({}, EVAL_ELE, getEvalChange(EVAL_ELE, v)))
})

while (evalArr.length) {
	let nowEl = evalArr.shift()

	console.log(nowEl)

	if (nowEl.total === NUMS.length - 1) {
		eval(nowEl.str) === RESULT && resultArr.push(nowEl.str)
	} else {
		OPERATOR.forEach(v => {
			let newEl = getEvalChange(nowEl, v)
			if (checkOperatorNum(newEl)) {
				evalArr.push(Object.assign({}, nowEl, newEl))
			}
		})
	}
}

console.log('------------------ANSWER------------------')
console.log(resultArr)

console.log('------------------！BUT！------------------')
console.log('123-45-67+89=100')
