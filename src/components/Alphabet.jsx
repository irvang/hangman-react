import { Letter } from './Letter'

const alphabetLetters = [
  ['a', 'b', 'c', 'd', 'e'],
  ['f', 'g', 'h', 'i', 'j'],
  ['k', 'l', 'm', 'n', 'o'],
  ['p', 'q', 'r', 's', 't'],
  ['u', 'v', 'w', 'x', 'y', 'z']
]

export const Alphabet = () => (
  <div className="Alphabet">
    {
      alphabetLetters.map((row, i) => {
        return <div key={row[0][0]} className="Alphabet_row">
          {row.map((letter) => { return <Letter key={letter}>{letter}</Letter> })}
        </div>
      })
    }

  </div>
)
