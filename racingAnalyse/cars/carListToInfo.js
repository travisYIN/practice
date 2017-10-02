var fs = require('fs'),
    async = require('async'),
    cheerio = require("cheerio"),
    carUrlList = [],
    carDesc = '',
    splits = [
      'Availability',
      'Characteristics',
      'Upgrades',
      'Navigation'
    ],
    parts = [{
      name: 'info',
      index: 0
    }, {
      name: 'char',
      index: 2
    }, {
      name: 'upgr',
      index: 3
    }],
    readStream = fs.createReadStream('../datafile/source/carurl.txt'),
    writeStream = fs.createWriteStream('../datafile/result/cars.txt'),
    util = require('../util/util')

function infoBlockToJSON (arr) {
  var result = {},
      formatedArr = {}

  // get name from wikipedia & get info from Infobox/car
  // eg:
  // {{Wikipedia|Aston Martin DB9}}
  //                    ||
  //                   name
  // {{Infobox/car|Manufacturer Logo = Aston Martin|Model Name = DB9}}
  // => { 'Manufacturer Logo': 'Aston Martin', 'Model Name': 'DB9' }
  arr.forEach((el, i) => {
    if (util.strToArr(el)[0] == 'Wikipedia') {
      formatedArr.name = util.strToArr(el)
    } else if (util.strToArr(el)[0].trim() == 'Infobox/car') {
      formatedArr.info = util.strToArr(el)
    }
  })


  result = util.mapKeyValue(formatedArr.info)
  // if wikipedia part no exist, get name from Infobox/car
  // eg:
  // {{Infobox/car|Manufacturer Logo = Aston Martin|Model Name = DB9}}
  // name => 'Aston Martin' + 'DB9'
  result.name = formatedArr.name && formatedArr.name[1] ? formatedArr.name[1] : result['Manufacturer Logo'] + ' ' + result['Model Name']

  return result
}

function charBlockToJSON (arr) {
  // map arr[0] key=value to {key: value}
  // eg:
  // {{T/stats|PR Initial = 33.6|TPSMPH = 183|TPSKMH = 294}}
  // => { 'PR Initial': 33.6, 'TPSMPH': 183, 'TPSKMH': 294 }
  return arr[0] ? util.mapKeyValue(util.strToArr(arr[0])) : {}
}

function upgrBlockToJSON (arr) {
  var result = {},
      formatedArr = []

  // classify each el in arr
  // eg:
  // {{R/upgrades|1|Engine|High Flow Carbon Fibre Airbox|30 minutes|12,200|3}}
  //                  ||                   ||                 ||       ||  ||
  //            classification            name             duration    rs coin
  arr.forEach((el, i) => {
    formatedArr = util.strToArr(el)

    if (i == 0) {
      return
    }

    if (!formatedArr[2]) {
      result['total'] = formatedArr[1]
      return
    }

    if (!result[formatedArr[2]]) {
      result[formatedArr[2]] = []
    }

    result[formatedArr[2]].push({
      name: formatedArr[3],
      duration: formatedArr[4],
      rs: formatedArr[5],
      coin: formatedArr[6]
    })

  })

  return result
}

function blocksToJSON (arr) {
  var result = {}

  result.info = infoBlockToJSON(arr.info)
  result.char = charBlockToJSON(arr.char)
  result.upgr = upgrBlockToJSON(arr.upgr)

  return result
}

readStream.on('data', data => {
  carUrlList = data.toString().split('\n').slice(0,Number.isNaN(process.argv[2]) ? -1 : process.argv[2])

  async.mapLimit(carUrlList, 5, (url, callback) => {
    if (url) {
      console.log('#### REQUEST: ' + url + ' ####')

      util.fetchUrl(url)
        .then(data => {
          var $ = cheerio.load(data)

          carDesc = $('#wpTextbox1').text().split('\n').join('')

          console.log('Analysing record: ' + url)
          writeStream.write(JSON.stringify(blocksToJSON(util.getDataPart(carDesc, splits, parts))) + '\n')

          callback()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      callback()
    }
  }, () => {
    console.log('\nSUCCESS!')
  })
})
