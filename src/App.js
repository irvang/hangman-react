import React, { useEffect, useState, useCallback } from 'react'
import './App.scss'
import { Context } from './Context'
import { Alphabet } from './components/Alphabet'
import { Canvas } from './components/Canvas'
import { Options } from './components/Options'
import { WordDisplay } from './components/WordDisplay'
import { RemainingTrials } from './components/RemainingTrials'
import { API } from './API'
import { DisplayMetadata } from './components/DisplayMetadata'

// const { words: wordsApi } = API

function App() {
  const [minLength, setMinLength] = useState(2)
  const [maxLength, setMaxLength] = useState(15)
  // const [isPhrase, setIsPhrase] = useState(false)
  const [maskedWord, setMaskedWord] = useState('___')
  const [remainingTrials, setRemainingTrials] = useState(null)
  const [resetChildren, setResetChildren] = useState(false)
  const [isGameWon, setIsGameWon] = useState(null)
  const [isFetchingWord, setIsFetchingWord] = useState(false)
  const [wordMetadata, setWordMetadata] = useState(null)

  const handleMinLengthChange = (event) => {
    setMinLength(event.target.value)
  }
  const handleMaxLengthChange = (event) => {
    setMaxLength(event.target.value)
  }

  const fetchDataAndStart = useCallback(() => {
    const getData = async () => {
      try {
        setResetChildren(true)

        setIsFetchingWord(true)

        const response = await API.words.getWord({ minLength, maxLength })
        const { data } = response

        setIsFetchingWord(false)
        setMaskedWord(data.maskedWord)
        setRemainingTrials(data.remainingTrials)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [maxLength, minLength])

  useEffect(() => {
    fetchDataAndStart()
  }, [fetchDataAndStart])

  // useEffect(() => {
  //   console.log('IS GAME WON CHANGED')
  // }, [isGameWon])

  return (
    <Context.Provider
      value={{
        setMaskedWord,
        remainingTrials,
        setRemainingTrials,
        setResetChildren,
        resetChildren,
        isGameWon,
        setIsGameWon,
        wordMetadata,
        setWordMetadata
      }}
    >
      <main className="center-screen">
        <div className="halfScreen">
          <Alphabet />

          <Canvas />

          <WordDisplay
            maskedWord={maskedWord}
            isFetchingWord={isFetchingWord}
          />

          <RemainingTrials />
        </div>

        <section className="halfScreen rightElementsPadding">
          <div className="game-mode">
            Game mode:&nbsp;
            <label>
              <input type="checkbox" name="phrase" value="word" /> Word
            </label>
            <label>
              <input type="checkbox" name="word" value="phrase" />
              Phrase
            </label>
          </div>

          <button type="button" id="new-word-b" onClick={fetchDataAndStart}>
            New word
          </button>

          {/*   <button
            type="button"
            id="new-word-b"
            onClick={async (event) => {
              const { data } = axios.get('/api/word/data')
              console.log('GOTTEN :', data)
            }}
          >
            Get data
          </button> */}

          <RemainingTrials />

          <section id="params">
            <div>
              <label htmlFor="min-length">Min length</label>
              <select
                className="isDisabled"
                name="min-length"
                id="min-length"
                onChange={handleMinLengthChange}
                defaultValue={3}
              >
                <Options />
              </select>
            </div>

            <div>
              <label htmlFor="max-length">Max length</label>
              <select
                className="isDisabled"
                defaultValue={15}
                name="max-length"
                id="max-length"
                onChange={handleMaxLengthChange}
              >
                <Options />
              </select>
            </div>
          </section>

          <DisplayMetadata />
        </section>
      </main>
    </Context.Provider>
  )
}

export default App
