import React from 'react'
import { Context } from '../Context'

export const RemainingTrials = (props) => {
  const { remainingTrials } = React.useContext(Context)
  return (
    <p id="remaining-trials">
      {remainingTrials ? <span> Trials: {remainingTrials}</span> : 'Game Over'}
    </p>
  )
}
