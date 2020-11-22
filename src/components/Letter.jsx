import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Context } from '../../Context'

import classnames from 'classnames'

export const Letter = ({ children }) => {
  const {
    setMaskedWord,
    setRemainingTrials,
    resetChildren,
    setResetChildren
  } = React.useContext(Context)

  const [isLetterInWord, setIsLetterInWord] = useState(null)

  useEffect(() => {
    if (resetChildren) {
      // reset children and set to false to avoid recurrent loop
      setIsLetterInWord(null)
      setResetChildren(false)
    }
  }, [resetChildren, setResetChildren])

  const sendLetterToCompare = async (event) => {
    console.log(event.target.textContent, children)

    const { data } = await axios.post('/word/letter', {
      letter: event.target.textContent
    })

    const { maskedWord, isLetterInWord } = data
    console.log('received:', maskedWord, isLetterInWord)
    setIsLetterInWord(isLetterInWord)
    setMaskedWord(maskedWord)
    setRemainingTrials(data.remainingTrials)
  }

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
