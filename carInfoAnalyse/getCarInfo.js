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
      part: 0
    }, {
      name: 'char',
      part: 2
    }, {
      name: 'upgr',
      part: 3
    }]

console.log('\n############################\n############################\n######## START HERE ########\n############################\n############################\n')

function getWrapedData (str) {
  var i,
    num = 0,
    text = '',
    result = []

  for (i of str) {
    switch (i) {
      case '{':
        num++
        break
      case '}':
        num--
        break
      default:
        break
    }

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

function getDataArrs (strToAnalyse, splitStrs, wantedParts) {
  var result = [],
    splitedStrArr = []

  splitStrs.forEach(splitString => {
    var splitedStr = strToAnalyse.split(splitString)
    splitedStrArr.push(splitedStr[0])
    strToAnalyse = splitedStr[1]
  })

  splitedStrArr.push(strToAnalyse)

  wantedParts.forEach(arr => {
    result[arr.name] = getWrapedData(splitedStrArr[arr.part])
  })

  return result
}

function formatStr (str) {
  console.log(str)
  return str.replace(/[{}]/g, '').split('|')
}

function mapKeyValue (arr) {
  var result = {},
    keyVal = []

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

  arr.forEach((el, i) => {
    if (formatStr(el)[0] == 'Wikipedia') {
      formatedArr.name = formatStr(el)
    } else if (formatStr(el)[0] == 'Infobox/car') {
      formatedArr.info = formatStr(el)
    }
  })

  result = mapKeyValue(formatedArr.info)
  result.name = formatedArr.name[1] ? formatedArr.name[1] : result['Manufacturer Logo'] + ' ' + result['Model Name']

  return result
}

function charBlockToJSON (arr) {
  return mapKeyValue(formatStr(arr[0]))
}

function upgrBlockToJSON (arr) {
  var result = {},
      formatedArr = []

  arr.forEach((el, i) => {
    formatedArr = formatStr(el)

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

  console.log(arr, 'weoifjwioejio')
  result.info = infoBlockToJSON(arr.info)
  result.char = charBlockToJSON(arr.char)
  result.upgr = upgrBlockToJSON(arr.upgr)

  return result
}

fs.readFile('cardescs.txt', 'utf8', (error, data) => {
  carDescList = data.split('\n')
  console.log(carDescList)

  carDescList.forEach(e => {
    carInfoList.push(blocksToJSON(getDataArrs(e, splits, parts)))
  })

  fs.writeFile('carinfo.txt', carInfoList.join('\n'), error => {
    if (error) {
      console.log('ERROR: ', error);
    } else {
      console.log('\nSUCCESS: Write car info list into carinfo.txt.');
    }
  });
})
// var blocks1 = getDataArrs(input1, splits, parts),
//     blocks2 = getDataArrs(input2, splits, parts),
//     blocks3 = getDataArrs(input3, splits, parts)

// console.log(blocks3, blocksToJSON(blocks3))
