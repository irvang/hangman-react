/**
 * Router for the Words API
 * Use router to handle the routes.
 */
const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const fs = require('fs')
require('dotenv').config()

const axios = require('axios')

// https://blog.api.rakuten.net/top-10-best-dictionary-apis-oxford-urban-wordnik/
/**
 * Gets the word from RapidAPI (Words API) that is sent to front
 * @param {*} param0
 * @returns
 */
const getWordsApi = async ({ lettersMin, lettersMax }) => {
  try {
    const { data } = await axios({
      method: 'GET',
      // url: 'https://wordsapiv1.p.rapidapi.com/words/?hasDetails=[synonyms,definitions]',
      url: 'https://wordsapiv1.p.rapidapi.com/words/?hasDetails=synonyms,definitions',
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
        lettersMin,
        lettersMax
        // // page: "1",
        // letters: "5",
        // lettersMin: '3',
        // lettersMax: '17'
        // hasDetails: "hasDetails,typeof",
      }
    })

    // data to pass to get route
    if (data) {
      return data
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Extract the metadata that comes from the Words API.
 * At the moment the definition is what I need is the definition and synonyms.
 * @param {*} param0
 * @returns
 */
const extractWordMetadata = (data) => {
  try {
    const wordMetadata = {
      word: data.word
    }
    wordMetadata.syllables = data.syllables

    if (data.results && data.results.length > 0) {
      // create object with definitions and synonyms
      // {definitions: <string>, synonyms: <Array> }
      wordMetadata.synonymsAndDefs = data.results.map((item) => ({
        definition: item.definition,
        synonyms: item.synonyms
      }))
    }

    console.log('WORD METADATA ', wordMetadata)
    return wordMetadata
  } catch (error) {
    console.error('ERROR processing metadata', error)
    throw error
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

    if (!data) {
      throw Error("'data' is undefined")
    }
    const { word } = data
    let maskedWord = ''

    if (!word) {
      throw Error('word is empty or undefined')
    }
    // generate word dash string
    for (let letter of word) {
      maskedWord += '_'
    }

    const sessionData = req.session

    // wordData should hold word and definition
    sessionData.wordData = data
    sessionData.wordMetadata = extractWordMetadata(data)
    sessionData.maskedWord = maskedWord
    sessionData.testedLetters = []
    sessionData.remainingTrials = 6
    sessionData.isGameWon = null

    res.send({
      wordLength: word.length,
      maskedWord,
      remainingTrials: sessionData.remainingTrials,
      isGameWon: sessionData.isGameWon,
      // wordData: sessionData.isGameWon !== null && sessionData.wordData
      // wordData: sessionData.isGameWon === null ? {} : sessionData.wordData,
      wordMetadata: sessionData.wordMetadata
    })
  } catch (error) {
    console.error(error)
    throw error
  }
})

/**
 * Returs the word metadata that is stored on session
 *
 * not used at the moment
 */
/* router.get('/metadata', async (req, res, next) => {
  try {

    const { wordData } = req.session
    // console.log('COOKIE', req.session.cookie)
    return res.send({ theData: req.session })
  } catch (error) {
    console.error('ERROR - in /metadata', error)
    res.status(404).send({ message: 'NOT FOUND' })
  }
}) */

/**
 * Compares letter. Does replacement and masking.
 */
router.post('/', (req, res, next) => {
  const { letter } = req.body

  const sessionData = req.session

  const { word } = sessionData.wordData
  const { maskedWord } = sessionData

  let isLetterInWord = null

  if (sessionData.remainingTrials > 0 && sessionData.isGameWon === null) {
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

      sessionData.maskedWord = newMaskedWord

      if (word === newMaskedWord) {
        sessionData.isGameWon = true
      }
    } else {
      isLetterInWord = false
      sessionData.remainingTrials -= 1

      if (sessionData.remainingTrials === 0) {
        sessionData.isGameWon = false
      }
    }
  }

  res.send({
    maskedWord: sessionData.maskedWord,
    isLetterInWord,
    remainingTrials: sessionData.remainingTrials,
    isGameWon: sessionData.isGameWon,
    /* Is game won remains null until set to either true or false. We account for that change.  */
    wordMetadata: sessionData.isGameWon !== null && sessionData.wordMetadata
  })
})
module.exports = router

/* const getMerriamWord = async ({ lettersMin, lettersMax }) => {
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
} */
