import React from 'react';
import './GameOverScreen.css'; // S'assurer que le CSS est bien importé

export default function GameOverScreen({ score, onRestart }) {
  return (
    <div className="game-over-container cinematic-bg"> {/* Ajout de la classe cinematic-bg */}
      <div className="game-over-content">
        <h1 className="game-over-title">GAME OVER</h1> {/* Titre stylisé */}
        <p className="final-score-text">Votre score final : <span className="score-value">{score}</span></p>
        
        {/* Bouton avec un effet "pressable" */}
        <button className="restart-button" onClick={onRestart}>
          REJOUER
        </button>

        {/* Optionnel: Un petit message ou un lien vers un leaderboard */}
        <p className="retro-message">Merci d'avoir joué !</p>
      </div>
    </div>
  );
}