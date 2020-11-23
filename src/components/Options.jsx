export const Options = (props) => {
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
