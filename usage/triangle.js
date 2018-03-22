/*
 * 差三角
 * 已有15张卡牌，上面的数字为1...15，用这些卡牌组成一个三角形
 * 每张牌是下方两张牌的差值的绝对值
 * Example:
 *     5
 *   4  9
 */

function getTotalNums() {
	return Array.from(Array(TOTAL_CARD), (val, index) => index + 1);
}

function getRestNums(all, arr) {
	arr.forEach(v => {
		all.splice(all.indexOf(v), 1)
	})

	return all
}

function getAnotherNum(arr, num1, num2) {
	let res1 = num1 - num2
	let res2 = num1 + num2
	let res = []

	res1 > 0 && arr.indexOf(res1) != -1 && res.push(res1)
	res2 > 0 && arr.indexOf(res2) != -1 && res.push(res2)

	return res
}

const FIRST_CARD_INDEX = [0, 1, 3, 6, 10]
const TOTAL_CARD = 15

let query = [[]]
let answer = []

while (query.length) {
	let now = query.shift()
	let rest = getRestNums(getTotalNums(), now)
	const LEN = now.length

	if (LEN == TOTAL_CARD) {
		answer.push(now)
	} else if (FIRST_CARD_INDEX.indexOf(LEN) != -1) {
		rest.forEach(v => {
			query.push(now.concat([v]))
		})
	} else {
		let possible

		FIRST_CARD_INDEX.forEach((v, i) => {
			if (LEN > v) {
				possible = getAnotherNum(rest, now[LEN - 1], now[LEN - i - 1])
				return
			}
		})
		possible.forEach(v => {
			query.push(now.concat([v]))
		})
	}
}

console.log(answer)
