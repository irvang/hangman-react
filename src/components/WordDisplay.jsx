import React from 'react'
import { Context } from '../Context'


export const WordDisplay = ({
}) => {
  const {
    maskedWord,
    isFetchingWord
  } = React.useContext(Context)

  return (
    <div className="WordDisplay">{isFetchingWord ? '...' : maskedWord}</div>
  )
}