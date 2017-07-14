var request = require('request'),
    fs = require('fs'),
    async = require('async'),
    cheerio = require("cheerio"),
    carUrlList = [],
    carDescList = []

function fetchUrl(url, callback, cb) {
  request(url, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      callback && callback(url, body)
      cb && cb()
    } else {
      console.log('Fail to fetch url: ' + url)
      console.log('ERROR: ', error)
    }
  })
}

fs.readFile('carlist.txt', 'utf8', (error, data) => {
  carUrlList = data.split('\n').slice(0,10)

  console.log(carUrlList)
  
  async.mapLimit(carUrlList, 5, (url, callback) => {
    console.log('#### REQUEST: ' + url + ' ####')

    fetchUrl(url, (url, data) => {
      var $ = cheerio.load(data)

      carDescList.push($('#wpTextbox1').text().split('\n').join(''))
    }, callback)
  }, () => {
    fs.writeFile('cardescs.txt', carDescList.join('\n'), error => {
      if (error) {
        console.log('ERROR: ', error);
      } else {
        console.log('\nSUCCESS: Write car descs info into cardescs.txt.');
      }
    });
  })
})

