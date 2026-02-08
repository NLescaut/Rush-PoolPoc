import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'


const API = "http://localhost:4000"; // backend

export default function Game() {
  const [score, setScore] = useState(0);
  const queryClient = useQueryClient()
  const {data:card , isPending, error} = useQuery({
    queryKey: ['random'],
    queryFn: () => fetch('http://localhost:4000/api/game/random').then(r => r.json()),
  })
 
  async function correct(name) {
    if (card === undefined)
      return
    const paylod ={
      cardId:card.id,
      answer: name
    }
    fetch('http://localhost:4000/api/game/answer')
    const reponce  = await fetch('http://localhost:4000/api/game/answer', {
      method:'POST',
      body:JSON.stringify( paylod),
      headers: {
        "Content-Type": "application/json",
      }
    })
    
    const result = await reponce.json()
    console.log(result)

    if (result.correct){
      setScore(score+result.points)
      queryClient.invalidateQueries({ queryKey: ['random'] })
    }
    else{
      setScore(0)
      queryClient.invalidateQueries({ queryKey: ['random'] })
    }

  }


  return (
    <>
    
      <h1>P.Diddy or Epstein</h1>

      <div className="card">
        <p>Score : {score}</p>
      </div>

      <div
        className="encadre"
        style={{
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {isPending && <p>Chargement...</p>}

        {!isPending && card?.url && (
          <img
            src={`${card.url}`}
            alt="card"
            style={{ maxWidth: "100%", maxHeight: 320, objectFit: "contain" }}
            onError={() => setFeedback("❌ L’image n’est pas accessible (URL/uploads).")}
          />
        )}

        {!isPending && !card && <p>Aucune image</p>}
      </div>

      <div className="card">
        <div className="button" style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button disabled={isPending || !card} onClick={() => correct("P_DIDDY")}>
            P.Diddy
          </button>
          <button disabled={isPending || !card} onClick={() => correct("EPSTEIN")}>
            Epstein
          </button>
        </div>
      </div>

      <Link to="/scorebord">Look your scoreboard</Link>

      <p className="read-the-docs">
        All the people you will see here were at an event. For more information, please ask.
      </p>
  
    </>
  );
}
