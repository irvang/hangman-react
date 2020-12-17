export const WordDisplay = ({
  maskedWord,
  isFetchingWord
}) => (
  <div className="WordDisplay">{isFetchingWord ? '...' : maskedWord}</div>
)