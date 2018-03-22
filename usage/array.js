/*
 * 生成0...N和1...N的数组
 */

function getOneToNum(N) {
	return Array.from(Array(N), (val, index) => index + 1);
}

function getZeroToNum(N) {
	return [...Array(N + 1).keys()]
}

console.log(getOneToNum(8))
console.log(getZeroToNum(8))