var fs = require('fs'),
    cheerio = require("cheerio"),
    writeStream = fs.createWriteStream('../datafile/source/calendar.txt'),
    baseUrl = 'http://rr3.wikia.com',
    util = require('../util/util')

console.log('\nStart request for calendar list...')

util.fetchUrl(baseUrl + '/wiki/Real_Racing_3_Wiki:Calendar?action=edit')
  .then(data => {
    var $ = cheerio.load(data)

    writeStream.write($("#wpTextbox1").text())

    console.log('SUCCESS!')
  })
  .catch(err => {
    console.log(err)
  })
