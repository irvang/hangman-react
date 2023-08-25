


export const GameMode = (first) => {

  return <div className="game-mode">
    Game mode:&nbsp;
    <label>
      <input type="checkbox" name="phrase" value="word" /> Word
    </label>
    <label>
      <input type="checkbox" name="word" value="phrase" />
      Phrase
    </label>
  </div>
}