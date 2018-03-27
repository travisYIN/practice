/*
 * 在连续的正整数N1...N2间填充给定的基础运算符或空白
 * 每种运算符只能最多填充M次
 * 得到给定的运算结果X
 * 有几种解法？
 */

const N1 = 1
const N2 = 9
const OPERATOR = ['+', '-', '*', '']
const M = 3
const X = 100

const NUMS = getZeroToNum(N2).slice(N1, N2 + 1)
const OPERATOR_NUM_LIMIT = M
const RESULT = X
const EVAL_ELE = {
	str: NUMS[0],
	plus: 0,
	minus: 0,
	mul: 0,
	total: 0
}

let evalArr = []
let resultArr = []

function getZeroToNum(N) {
	return [...Array(N + 1).keys()]
}

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
		case '':
			return {
				str: el.str + operator + NUMS[el.total + 1],
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

console.log(`------------------ANSWER: ${RESULT}------------------`)
console.log(resultArr)
