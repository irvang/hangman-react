import './App.css'
import axios from 'axios'

function App() {
  const testServer = async () => {
    const response = await axios.get('/ping')
    console.log('RESPONSE', response)
  }
  return (
    <div className="App" onClick={testServer}>
      Hello word
    </div>
  )
}

export default App
