import React, { useEffect, useState, useCallback } from 'react'
// import './App.scss'
import { Context } from './Context'
import { Alphabet } from './components/Alphabet'
import { Canvas } from './components/Canvas'
import { WordDisplay } from './components/WordDisplay'
import { RemainingTrials } from './components/RemainingTrials'
import { API } from './API'
import { DisplayMetadata } from './components/DisplayMetadata'
import { GameMode } from './components/GameMode'
import { NewWordBtn } from './components/NewWordBtn'
import { MinMaxLength } from './components/MinMaxLength'

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
        maskedWord,
        setMaskedWord,
        remainingTrials,
        setRemainingTrials,
        setResetChildren,
        resetChildren,
        isGameWon,
        setIsGameWon,
        wordMetadata,
        setWordMetadata,
        isFetchingWord,
        handleMinLengthChange,
        handleMaxLengthChange
      }}
    >
      <main className="center-screen">
        <div className="halfScreen">
          <Alphabet />
          <Canvas />
          <WordDisplay />
          <RemainingTrials />
        </div>

        <section className="halfScreen rightElementsPadding">

          {/* <GameMode/> */}
          <NewWordBtn />
          <RemainingTrials />
          <MinMaxLength />
          <DisplayMetadata />
        </section>
      </main>
    </Context.Provider>
  )
}

export default App
