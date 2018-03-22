let fs = require('fs'),
	readStream = fs.createReadStream('README.md'),
	writeStream

function writeFileTree (path, dir, deep) {
	if (dir[0] == '.' || dir == 'node_modules' || dir == 'npm-debug.log') return ''

	let res
	let dirStatus

	res = '\n' + Array(4 * deep).fill(' ').join('') + '- ' + dir
	dir = path + '/' + dir
	dirStatus = fs.statSync(dir)

	if (dirStatus.isDirectory()) {
		let dirContent = fs.readdirSync(dir)

		dirContent.forEach(con => {
			res += writeFileTree(dir, con, deep + 1)
		})
	}

	return res
}

readStream.on('data', data => {
	let text = data.toString().split('====================')[0]
	let content = ''
	let dir = fs.readdirSync('.')

	dir.forEach(v => {
		content += writeFileTree('.', v, 0)
	})

	writeStream = fs.createWriteStream('README.md')
	writeStream.write(text + '====================\n' + content)
})
