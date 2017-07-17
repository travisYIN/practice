var fs = require('fs'),
    async = require('async'),
    request = require('request'),
    cheerio = require("cheerio"),
    carUrlList = [],
    readStream = fs.createReadStream('datafile/carlist.txt'),
    writeStream = fs.createWriteStream('datafile/cardesc.txt')

var fetchUrl = url => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body)
      } else {
        reject(error)
      }
    })
  })
}

readStream.on('data', data => {
  carUrlList = data.toString().split('\n').slice(0,Number.isNaN(process.argv[2]) ? -1 : process.argv[2])

  async.mapLimit(carUrlList, 5, (url, callback) => {
    console.log('#### REQUEST: ' + url + ' ####')

    fetchUrl(url)
      .then(data => {
        var $ = cheerio.load(data)

        writeStream.write($('#wpTextbox1').text().split('\n').join('') + 'END\n')

        callback()
      })
      .catch(err => {
        console.log(err)
      })
  }, () => {
    console.log('\nSUCCESS!')
  })
})
