import React, { useState, useEffect } from 'react'
import { Context } from '../Context'

export const RemainingTrials = (props) => {
  const { remainingTrials, isGameWon } = React.useContext(Context)

  const [spanValue, setSpanValue] = useState(null)

  useEffect(() => {
    if (isGameWon === true) {
      setSpanValue(<span>You Won!</span>)
    } else if (isGameWon === false) {
      setSpanValue(<span>Sorry, try again!</span>)
    } else if (remainingTrials > 0) {
      setSpanValue(<span> Trials: {remainingTrials}</span>)
    }
  }, [remainingTrials, isGameWon])

  return (
    <p id="remaining-trials">
      {spanValue}
      {/* {remainingTrials && <span> Trials: {remainingTrials}</span>} */}
    </p>
  )
}
