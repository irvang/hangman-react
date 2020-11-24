const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const fs = require('fs')
require('dotenv').config()

const axios = require('axios')

// https://blog.api.rakuten.net/top-10-best-dictionary-apis-oxford-urban-wordnik/

const getWordsApi = async ({ lettersMin, lettersMax }) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: 'https://wordsapiv1.p.rapidapi.com/words/',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        'x-rapidapi-key': process.env.WORDS_API_KEY,
        useQueryString: true
      },
      params: {
        random: true,
        // letterPattern: /^[a-zA-Z0-9]*$/,
        letterPattern: '^[a-zA-Z]*$',
        // // pronunciationpattern: ".*%C3%A6m%24",
        limit: '100',
        // // page: "1",
        // letters: "5",
        // lettersMin: '3',
        // lettersMax: '17'
        lettersMin,
        lettersMax
        // hasDetails: "hasDetails,typeof",
      }
    })
    // console.clear();
    console.log('DATA: ', data)

    if (data.results) {
      if (data.results[0].synonyms) {
        console.log('SYNONYM', data.results[0].synonyms.toString())
      }
      console.log(
        'DEFINITIONS',
        data.results.map((item) => item.definition)
      )

      if (data.results.typeOf) {
        console.log('TYPE OF', data.typeOf)
      }
    }
    if (data.syllables) {
      console.log('SYLLABLES', data.syllables)
    }
    if (data) {
      return data
    }
  } catch (error) {
    console.error(error)
  }
}

const getMerriamWord = async ({ lettersMin, lettersMax }) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: 'https://wordsapiv1.p.rapidapi.com/words/',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
        'x-rapidapi-key': process.env.WORDS_API_KEY,
        useQueryString: true
      },
      params: {
        random: true,
        // letterPattern: /^[a-zA-Z0-9]*$/,
        letterPattern: '^[a-zA-Z]*$',
        // // pronunciationpattern: ".*%C3%A6m%24",
        limit: '100',
        // // page: "1",
        // letters: "5",
        // lettersMin: '3',
        // lettersMax: '17'
        lettersMin,
        lettersMax
        // hasDetails: "hasDetails,typeof",
      }
    })
    // console.clear();
    console.log('DATA: ', data)

    if (data.results) {
      if (data.results[0].synonyms) {
        console.log('SYNONYM', data.results[0].synonyms.toString())
      }

      const definitions = data.results.map((item) => item.definition)
      console.log('DEFINITIONS', definitions)

      if (data.results.typeOf) {
        console.log('TYPE OF', data.typeOf)
      }
    }
    if (data.syllables) {
      console.log('SYLLABLES', data.syllables)
    }
    if (data) {
      return data
    }
  } catch (error) {
    console.error(error)
  }
}
// @route: GET / words
// @desc Get all words from Reach.io API.Uses fetch to get around the Cross -
//   Origin Resource Sharing(CORS) policy issue when requesting access directly
// from the front end.

router.get('/:lettersMin/:lettersMax', async (req, res) => {
  // router.get('/:difficulty/:minLength/:maxLength', (req, res) => {
  /* To use the different queries in api: 
  http://app.linkedin-reach.io/words?difficulty=1&minLength=3&maxLength=5 etc...*/

  try {
    const { lettersMin, lettersMax } = req.params

    const data = await getWordsApi({ lettersMin, lettersMax })

    const { word } = data
    let maskedWord = ''
    // generate word dash string
    for (let _ of word) {
      maskedWord += '_'
    }

    const sessData = req.session
    sessData.wordData = data
    sessData.maskedWord = maskedWord
    sessData.testedLetters = []
    sessData.remainingTrials = 6
    sessData.isGameWon = null

    res.send({
      wordLength: word.length,
      maskedWord,
      remainingTrials: sessData.remainingTrials,
      isGameWon: sessData.isGameWon,
      wordData: sessData.isGameWon !== null && sessData.wordData
    })
  } catch (error) {
    console.error(error)
  }
})

router.get('/data', (req, res, next) => {
  const { wordData } = req.session
  console.log('DATA IN SESSION', wordData)

  console.log('COOKIE', req.session.cookie)
  return res.send({ theData: req.session })
})

router.post('/', (req, res, next) => {
  const { letter } = req.body

  const sessData = req.session
  // if(!sessData) {

  // }

  console.log('COOKIE', req.session.cookie)

  const { word } = sessData.wordData
  const { maskedWord } = sessData

  console.log('BODY, wordData: ', letter, word)

  let isLetterInWord = null

  if (sessData.remainingTrials > 0 && sessData.isGameWon === null) {
    if (word.includes(letter)) {
      isLetterInWord = true
      let newMaskedWord = ''

      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          newMaskedWord += letter
        } else {
          newMaskedWord += maskedWord[i]
        }
      }

      sessData.maskedWord = newMaskedWord

      if (word === newMaskedWord) {
        sessData.isGameWon = true
      }
    } else {
      isLetterInWord = false
      sessData.remainingTrials -= 1

      if (sessData.remainingTrials === 0) {
        sessData.isGameWon = false
      }
    }
  }

  res.send({
    maskedWord: sessData.maskedWord,
    isLetterInWord,
    remainingTrials: sessData.remainingTrials,
    isGameWon: sessData.isGameWon,
    wordData: sessData.isGameWon !== null && sessData.wordData
  })
})
module.exports = router
