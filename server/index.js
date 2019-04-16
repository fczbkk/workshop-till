const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

const {validateEmailAddress} = require('./../src/utilities.js')

app.use(bodyParser.json())
app.use('/static', express.static('static'))

app.get('/', function (req, res) {
  const indexPath = path.resolve(__dirname, '../client/index.html')
  res.sendFile(indexPath)
})

let latestValidationRequest = 0

app.get('/validate/', function (req, res) {
  const timestamp = Number(req.query.timestamp)
  const delay = req.query.delay

  setTimeout(function () {
    const response = {
      'receivedTimestamp': timestamp,
      'respondedTimestamp': (new Date()).getTime(),
      'state': 'ok',
      'result': {
        'isEmailValid': false,
        'reason': 'unknown'
      }
    }

    if (timestamp > latestValidationRequest) {
      latestValidationRequest = timestamp
      const emailAddress = req.query.email
      const isEmailValid = validateEmailAddress(emailAddress)

      if (isEmailValid) {
        response.result.isEmailValid = true
        response.result.reason = 'validation'
      } else {
        response.result.reason = 'validation'
      }
    } else {
      response.result.reason = 'race condition'
    }
    res.send(response)
  }, delay * 1000)

})

app.listen(3000)
