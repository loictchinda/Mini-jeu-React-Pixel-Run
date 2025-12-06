import React from 'react';
import './GameOverScreen.css';

export default function GameOverScreen({ score, onRestart }) {
  return (
    <div className="game-over-container">
      
      <h1>Game Over</h1>
      <p>Votre score final est : {score}</p>
      <button onClick={onRestart}>Rejouer</button>
    </div>
  );
}