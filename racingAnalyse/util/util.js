var request = require('request')

function fetchUrl (url) {
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

exports.fetchUrl = fetchUrl
exports.getWrappedData = getWrappedData
exports.strToArr = strToArr
exports.mapKeyValue = mapKeyValue