import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import { Context } from '../Context'
import classnames from 'classnames'
import { API } from '../API'

const { word: wordApi } = API

export const Letter = ({ children }) => {
  const {
    setMaskedWord,
    setRemainingTrials,
    resetChildren,
    setResetChildren,
    setIsGameWon
  } = React.useContext(Context)

  const [isLetterInWord, setIsLetterInWord] = useState(null)

  useEffect(() => {
    if (resetChildren) {
      // reset children and set to false to avoid recurrent loop
      setIsLetterInWord(null)
      setResetChildren(false)
    }
  }, [resetChildren, setResetChildren])

  const sendLetterToCompare = useCallback(
    (event) => {
      ;(async () => {
        const { data } = await wordApi.compareLetter({
          letter: event.target.textContent
        })

        console.log('DATA', data)
        const { maskedWord, isLetterInWord, isGameWon } = data

        setIsGameWon(isGameWon)
        setIsLetterInWord(isLetterInWord)
        setMaskedWord(maskedWord)
        setRemainingTrials(data.remainingTrials)
      })()
    },
    [setRemainingTrials, setMaskedWord]
  )

  return (
    <span
      className={classnames('Letter', {
        letterIsInWord: isLetterInWord,
        letterNotInWord: isLetterInWord === false //false, not any falsy value
      })}
      value={children}
      onClick={sendLetterToCompare}
    >
      {children}
    </span>
  )
}
