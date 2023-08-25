import React from 'react'
import { Context } from '../Context'
import { Options } from './Options'

export const MinMaxLength = ({
}) => {
  const {
    handleMinLengthChange,
    handleMaxLengthChange
  } = React.useContext(Context)

  return <section id="params">
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
}