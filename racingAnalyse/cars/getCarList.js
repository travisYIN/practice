var fs = require('fs'),
    cheerio = require("cheerio"),
    writeStream = fs.createWriteStream('../datafile/source/carurl.txt'),
    baseUrl = 'http://rr3.wikia.com',
    util = require('../util/util')

console.log('\nStart request for car list...')

util.fetchUrl(baseUrl + '/wiki/Cars')
  .then(data => {
    var $ = cheerio.load(data)
    
    $('#mw-content-text tr td:nth-child(3) a').each((i, e) => {
      writeStream.write(baseUrl + $(e).attr('href') + '?action=edit\n')
    })

    console.log('SUCCESS!')
  })
  .catch(err => {
    console.log(err)
  })
