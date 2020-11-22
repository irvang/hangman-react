const express = require('express')
const router = express.Router()
const fs = require('fs')
require('dotenv').config()
const axios = require('axios')

// @route GET /words
// @desc Gets and formats phrases' data
router.get('/phrase', (req, res) => {
  let data = ''

  // to use path, __dirname as a starting directory is needed, absolut path would
  // require route as if it started on app.js, since it is where route is called
  // https://stackabuse.com/read-files-with-node-js/
  const readStream = fs.createReadStream(
    __dirname + '/../assets/phrases.txt',
    'utf8'
  )

  readStream
    .on('data', function (chunk) {
      data += chunk
    })
    .on('end', function () {
      data = data.split('\n')

      let newArr = []
      for (let i = 0; i < data.length; i++) {
        //add data[i] and at i+1
        //remove non-alphabet characters, since there is no input for those
        if (
          data[i].includes('’') ||
          data[i].includes('‘') ||
          data[i].includes('(') ||
          data[i].includes(')') ||
          data[i].includes('.') ||
          data[i].includes(',') ||
          data[i].includes('/') ||
          data[i].includes('-') ||
          data[i].includes(';')
        ) {
          i++
          continue
        }

        // length>2 so no one-space word (' ') selected
        if (data[i] !== '' && data[i].length > 2) {
          // keeping structure the same to make it easier
          // body = {string: provider, array: definitions, string: word}
          if (data[i])
            newArr.push({
              word: data[i], //phrase
              definitions: data[i + 1], //single definition
              provider: `<a href='https://knowyourphrase.com/' target='_blank'>Know Your Phrase </a>`
            })
          //increase en extra one since value has been obtained already
          i++
        }
      }

      res.status(200).send(newArr)
    })
})

module.exports = router
