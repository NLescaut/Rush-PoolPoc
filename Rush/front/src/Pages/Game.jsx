import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:4000"; // backend

export default function Game() {
  const [score, setScore] = useState(0);
  const [card, setCard] = useState(null); // { id, url }
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function fetchRandom() {
    setLoading(true);
    setFeedback("");
    try {
      const res = await fetch(`${API}/api/game/random`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Random failed");
      setCard(data);
    } catch (e) {
      setCard(null);
      setFeedback("❌ Impossible de charger une image (random).");
    } finally {
      setLoading(false);
    }
  }

  async function answer(label) {
    if (!card) return;
    setLoading(true);
    setFeedback("");
    try {
      const res = await fetch(`${API}/api/game/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: card.id, answer: label }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Answer failed");

      if (data.correct) {
        const pts = data.points ?? 0;
        setScore((s) => s + pts);
        setFeedback(`✅ Correct (+${pts})`);
      } else {
        setFeedback(`❌ Faux (bonne réponse: ${data.correctLabel})`);
      }

      // petite pause visuelle avant d’enchaîner
      setTimeout(() => {
        fetchRandom();
      }, 400);
    } catch (e) {
      setFeedback("❌ Erreur lors de l’envoi de la réponse.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <>
      <h1>P.Diddy or Epstein</h1>

      <div className="card">
        <p>Score : {score}</p>
        {feedback && <p>{feedback}</p>}
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
        {loading && <p>Chargement...</p>}

        {!loading && card?.url && (
          <img
            src={`${API}${card.url}`}
            alt="card"
            style={{ maxWidth: "100%", maxHeight: 320, objectFit: "contain" }}
            onError={() => setFeedback("❌ L’image n’est pas accessible (URL/uploads).")}
          />
        )}

        {!loading && !card && <p>Aucune image</p>}
      </div>

      <div className="card">
        <div className="button" style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          {/* Texte du jeu, mais label envoyé = DB */}
          <button disabled={loading || !card} onClick={() => answer("LINKEDIN")}>
            P.Diddy
          </button>
          <button disabled={loading || !card} onClick={() => answer("INTERPOL")}>
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
