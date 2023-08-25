import React, { useState, useEffect, useCallback } from 'react'
import { Context } from '../Context'
import classnames from 'classnames'
import { API } from '../API'

// const { word: wordApi } = API
/**
 * 
 * @param {string} props.children - each single alphabet letter: 'a','b', 'c', etc
 * @returns 
 */
export const Letter = ({ children }) => {
  const {
    setMaskedWord,
    setRemainingTrials,
    resetChildren,
    setResetChildren,
    setIsGameWon,
    setWordMetadata
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
      ; (async () => {
        const { data } = await API.words.compareLetter({
          letter: event.target.textContent
        })

        const { maskedWord, isLetterInWord, isGameWon } = data

        setIsGameWon(isGameWon)
        setIsLetterInWord(isLetterInWord)
        setMaskedWord(maskedWord)
        setRemainingTrials(data.remainingTrials)

        // changes from null to either false or true
        data.wordMetadata && setWordMetadata(data.wordMetadata)

      })()
    },
    [setRemainingTrials, setMaskedWord]
  )

  return (
    <span
      className={classnames('Letter', {
        letterIsInWord: isLetterInWord,
        letterNotInWord: isLetterInWord === false //false, not just a falsy value
      })}
      value={children}
      onClick={sendLetterToCompare}
    >
      {children}
    </span>
  )
}
