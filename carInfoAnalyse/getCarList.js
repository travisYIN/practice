var request = require('request'),
    fs = require('fs'),
    cheerio = require("cheerio"),
    carUrlList = []

function fetchUrl(url, callback) {
  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      callback && callback(body)
    } else {
      console.log('Fail to fetch url: ' + url)
      console.log('ERROR: ', error)
    }
  })
}

fetchUrl('http://rr3.wikia.com/wiki/Cars', data => {
  var $ = cheerio.load(data)
  
  $('#mw-content-text tr td:nth-child(3) a').each((i, e) => {
    carUrlList.push('http://rr3.wikia.com' + $(e).attr('href') + '?action=edit')
  })

  fs.writeFile('carlist.txt', carUrlList.join('\n'), error => {
    if (error) {
      console.log('ERROR: ', error);
    } else {
      console.log('\nSUCCESS: Write car url list info into carlist.txt.');
    }
  });
})