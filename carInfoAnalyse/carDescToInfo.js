var fs = require('fs'),
    carDescList = [],
    carInfoList = [],
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
    readStream = fs.createReadStream('datafile/cardesc.txt'),
    writeStream = fs.createWriteStream('datafile/carinfo.txt')

// console.log('\n############################\n############################\n######## START HERE ########\n############################\n############################\n')

function getWrappedData (str) {
  var i,
      num = 0,
      text = '',
      result = []

  // loop str, get data wrapped by {{}}
  for (i of str) {
    i == '{' && num++
    i == '}' && num--

    if (num != 0) {
      text += i
    }
    if (num == 0 && i == '}') {
      text += i
      result.push(text)
      text = ''
    }
  }

  return result
}

function getDataPart (str, splits, parts) {
  var result = [],
      splitedStrArr = []

  // split str into several parts
  splits.forEach(split => {
    var splitedStr = str.split(split)
    splitedStr.length > 1 && splitedStrArr.push(splitedStr[0])
    str = splitedStr[splitedStr.length - 1]
  })

  splitedStrArr.push(str)

  // put wanted part into result
  parts.forEach(part => {
    result[part.name] = getWrappedData(splitedStrArr[part.index])
  })

  return result
}

function strToArr (str) {
  // remove {} from str and split str by '|'
  return str.replace(/[{}]/g, '').split('|')
}

function mapKeyValue (arr) {
  var result = {},
    keyVal = []

  // map key=value str to {key: value}
  arr.forEach((el, i) => {
    if (i == 0) {
      return
    }

    keyVal = el.split('=')
    result[keyVal[0].trim()] = keyVal[1].trim()
  })

  return result
}

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
    if (strToArr(el)[0] == 'Wikipedia') {
      formatedArr.name = strToArr(el)
    } else if (strToArr(el)[0].trim() == 'Infobox/car') {
      formatedArr.info = strToArr(el)
    }
  })


  result = mapKeyValue(formatedArr.info)
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
  return arr[0] ? mapKeyValue(strToArr(arr[0])) : {}
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
    formatedArr = strToArr(el)

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
  carDescList = (carDescList.length ? carDescList[carDescList.length - 1] + data.toString() : data.toString()).split('\n')

  readStream.pause()
  carDescList.forEach((e, i) => {
    console.log('Analysing record: ' + (i + 1))
    if (!e.endsWith('END')) {
      return
    }

    writeStream.write(JSON.stringify(blocksToJSON(getDataPart(e, splits, parts))) + '\n')
  })
  readStream.resume()
})

readStream.on('end', data => {
  console.log('\nSUCCESS!')
})
