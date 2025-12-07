import React, { useEffect, useState } from 'react';
import './GameOverScreen.css';

/**
 * Composant qui affiche l'écran de fin de partie.
 * Il montre le score final du joueur, son meilleur score personnel (enregistré dans le localStorage),
 * et propose des options pour rejouer ou retourner au menu principal.
 *
 * @param {object} props - Les propriétés du composant.
 * @param {number} props.score - Le score final de la partie qui vient de se terminer.
 * @param {Function} props.onRestart - La fonction de rappel à exécuter lorsque l'utilisateur clique sur "Rejouer".
 * @param {Function} props.onHome - La fonction de rappel à exécuter lorsque l'utilisateur clique sur "Menu Principal".
 * @returns {JSX.Element} L'écran de fin de partie.
 */
export default function GameOverScreen({ score, onRestart, onHome }) {
  /**
   * @type {[number, Function]}
   * L'état pour stocker et mettre à jour le meilleur score du joueur.
   */
  const [highScore, setHighScore] = useState(0);

  // Gère la logique du meilleur score à chaque fin de partie.
  useEffect(() => {
    // Récupère le meilleur score depuis le localStorage.
    const stored = localStorage.getItem('quizzRunHighScore');
    const best = stored ? parseInt(stored, 10) : 0;

    // Si le score actuel est meilleur, on le met à jour dans le localStorage et dans l'état.
    if (score > best) {
      localStorage.setItem('quizzRunHighScore', score);
      setHighScore(score);
    } else {
      // Sinon, on affiche le meilleur score existant.
      setHighScore(best);
    }
  }, [score]); // Cet effet se déclenche uniquement lorsque le score de la partie terminée change.

  return (
    <div className="game-over-overlay">
      <div className="game-over-card">
        <h1 className="game-over-title">Game Over</h1>
        
        <div className="score-section">
          <p className="score-text">Score final : {score}</p>
          <p className="highscore-text">Record personnel : {highScore}</p>
        </div>

        <div className="actions">
          <button className="btn-action btn-restart" onClick={onRestart}>
             Rejouer
          </button>
          
          <button className="btn-action btn-home" onClick={onHome}>
             Menu Principal
          </button>
        </div>
      </div>
    </div>
  );
}