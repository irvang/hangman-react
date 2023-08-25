import React from 'react'
import { Context } from '../Context'

export const NewWordBtn = () => {
  const { fetchDataAndStart } = React.useContext(Context)

  return <button type="button" id="new-word-b" onClick={fetchDataAndStart}>
    New Word!
  </button>
}