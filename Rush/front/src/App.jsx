import { useState } from 'react'
import './App.css'

// Mettre une compteur point reussie point louper
// score borde

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>P.Diddy or Epstein</h1>
            <div className="card">
        <p>Le compteur est : {count}</p>
      </div>
      <div className="encadre">
        Mettre les photos 
      </div>
      <div className="card">
        <div className="button">
          <button onClick={() => setCount((count) => count + 1)}>
            P.Diddy
          </button>

          <button onClick={() => setCount((count) => count + 1)}>
            Epstein
          </button>
        </div>  
      </div>
      <p className="read-the-docs">
        All the people you will see here w ere at an event. for more information, please ask.
      </p>
    </>
  )
}

export default App