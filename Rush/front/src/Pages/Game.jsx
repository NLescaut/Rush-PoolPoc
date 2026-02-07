import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:4000";

function Game() {
  const [score, setScore] = useState(0);
  const [card, setCard] = useState(null); // { id, url }
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadRandom() {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API}/api/game/random`);
      if (!res.ok) throw new Error("Failed to load random");
      const data = await res.json();
      setCard(data);
    } catch (e) {
      setMessage("Erreur: impossible de charger une image.");
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer(answer) {
    if (!card) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${API}/api/game/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: card.id, answer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Answer failed");

      if (data.correct) {
        setScore((s) => s + (data.points ?? 0));
        setMessage(`✅ Correct (+${data.points ?? 0})`);
      } else {
        setMessage(`❌ Faux (bonne réponse: ${data.correctLabel})`);
      }

      // charge la prochaine image
      await loadRandom();
    } catch (e) {
      setMessage("Erreur: réponse non envoyée.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRandom();
  }, []);

  return (
    <>
      <h1>P.Diddy or Epstein</h1>

      <div className="card">
        <p>Score : {score}</p>
        {message && <p>{message}</p>}
      </div>

      <div className="encadre" style={{ minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {loading && <p>Chargement...</p>}

        {!loading && card?.url && (
          <img
            src={`${API}${card.url}`}
            alt="card"
            style={{ maxWidth: "100%", maxHeight: 320, borderRadius: 12 }}
          />
        )}

        {!loading && !card && <p>Aucune image</p>}
      </div>

      <div className="card">
        <div className="button">
          <button disabled={loading || !card} onClick={() => submitAnswer("LINKEDIN")}>
            P.Diddy
          </button>

          <button disabled={loading || !card} onClick={() => submitAnswer("INTERPOL")}>
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

export default Game;
