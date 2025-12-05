import React, { useEffect, useState } from 'react';
import './GameOverScreen.css';

export default function GameOverScreen({ score, onRestart, onHome }) {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    // Gestion du meilleur score
    const stored = localStorage.getItem('quizzRunHighScore');
    const best = stored ? parseInt(stored, 10) : 0;

    if (score > best) {
      localStorage.setItem('quizzRunHighScore', score);
      setHighScore(score);
    } else {
      setHighScore(best);
    }
  }, [score]);

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
            🔄 Rejouer
          </button>
          
          <button className="btn-action btn-home" onClick={onHome}>
            🏠 Menu Principal
          </button>
        </div>
      </div>
    </div>
  );
}