var fs = require('fs'),
    request = require('request'),
    cheerio = require("cheerio"),
    carUrlList = [],
    writeStream = fs.createWriteStream('datafile/carlist.txt')

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

console.log('\nStart request for car list...')

fetchUrl('http://rr3.wikia.com/wiki/Cars')
  .then(data => {
    var $ = cheerio.load(data)
    
    $('#mw-content-text tr td:nth-child(3) a').each((i, e) => {
      carUrlList.push('http://rr3.wikia.com' + $(e).attr('href') + '?action=edit')
    })

    writeStream.write(carUrlList.join('\n'))

    console.log('SUCCESS!')
  })
  .catch(err => {
    console.log(err)
  })
  