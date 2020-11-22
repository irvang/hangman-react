import React, { useState, useEffect } from 'react'
import './App.scss'
import axios from 'axios'
import { Alphabet } from './components/Alphabet'
import { Context } from './Context'

import { Canvas } from './components/Canvas'

const WordDisplay = ({ maskedWord }) => (
  <div className="WordDisplay">{maskedWord}</div>
)

const RemainingTrials = (props) => {
  const { remainingTrials } = React.useContext(Context)
  return (
    <p id="remaining-trials">
      {remainingTrials ? <span> Trials: {remainingTrials}</span> : 'Game Over'}
    </p>
  )
}

const Options = (props) => {
  const options = []

  for (let i = 3; i <= 20; i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    )
  }

  return <>{options}</>
}

function App() {
  const [minLength, setMinLength] = useState(2)
  const [maxLength, setMaxLength] = useState(15)
  const [isPhrase, setIsPhrase] = useState(false)
  const [maskedWord, setMaskedWord] = useState('___')
  const [remainingTrials, setRemainingTrials] = useState(null)
  const [resetChildren, setResetChildren] = useState(false)

  const handleMinLengthChange = (event) => {
    setMinLength(event.target.value)
  }
  const handleMaxLengthChange = (event) => {
    setMaxLength(event.target.value)
  }

  const fetchDataAndStart = async () => {
    try {
      setResetChildren(true)
      let url = ''
      console.log('CLICKED NEW WORD')
      if (isPhrase) {
        url = '/words/phrases'
        // wordDisplay.style.fontSize = '1.0rem'
        // disableSelects();
      } else {
        // url = `/words/${difficulty}/${minLength}/${maxLength}`
        // wordDisplay.style.fontSize = '1.7rem'
        // enableSelects();
      }

      const { data } = await axios.get(`/word/${minLength}/${maxLength}`)
      console.log(data)
      setMaskedWord(data.maskedWord)
      setRemainingTrials(data.remainingTrials)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.log('masked changed', maskedWord)
  }, [maskedWord])

  return (
    <Context.Provider
      value={{
        setMaskedWord,
        remainingTrials,
        setRemainingTrials,
        setResetChildren,
        resetChildren
      }}
    >
      <main className="center-screen">
        <Alphabet />

        <Canvas />

        <WordDisplay maskedWord={maskedWord} />

        <RemainingTrials />

        <section className="main-2">
          <div className="game-mode">
            Game mode:&nbsp;
            <label>
              <input type="checkbox" name="phrase" value="word" checked /> Word
            </label>
            <label>
              <input type="checkbox" name="word" value="phrase" />
              Phrase
            </label>
          </div>

          <button type="button" id="new-word-b" onClick={fetchDataAndStart}>
            New word
          </button>
          <button
            type="button"
            id="new-word-b"
            onClick={async (event) => {
              const { data } = axios.get('/word/data')
              console.log('GOTTEN :', data)
            }}
          >
            Get data
          </button>

          <RemainingTrials />

          <section id="params">
            {/* <div>
            <label htmlFor="difficulty">Difficulty</label>
            <select
              className="isDisabled"
              name="difficulty"
              id="difficulty"
              defaultValue={3}
            >
              <Options />
            </select>
          </div> */}

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

          <section className="definitions">
            {/* HOLDS WORDS DEFINITIONS */}
          </section>
        </section>

        {/* // <script type="module" src="js/index.js"></script> */}
      </main>
    </Context.Provider>
  )
}

export default App
