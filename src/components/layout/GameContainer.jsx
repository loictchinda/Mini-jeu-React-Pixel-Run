import React, { useState, useEffect, useCallback } from 'react';
import CanvasGame from "../canvas/CanvasGame";
import HUDContainer from "../hud/HudContainer";
import { fetchQuestion } from "../../game/QuizEngine";
import GameOverScreen from "../canvas/GameOverScreen";
import {
  TRACK_SPEED, // Vitesse initiale du jeu (vous avez 4)
  SPEED_INCREMENT_PER_QUESTION, // Augmentation par question (vous avez 0.5)
} from "../../game/constants"; 


export default function GameContainer() {
  // ------------------------------------------
  // 1. ÉTATS DU JEU
  // ------------------------------------------
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  
  // ÉTATS POUR LA VITESSE
  const [questionCount, setQuestionCount] = useState(0); // Compteur de questions réussies
  const [gameSpeed, setGameSpeed] = useState(TRACK_SPEED); // Vitesse actuelle du canvas

  // ------------------------------------------
  // 2. FONCTIONS DE GESTION
  // ------------------------------------------

  /**
   * ⚡ Calcule et met à jour la vitesse (appelé après une bonne réponse ou au redémarrage).
   */
  const loadNewQuestion = useCallback(async (isInitialLoad = false) => {
    let newCount = questionCount;
    
    // Si ce n'est pas le chargement initial, cela signifie que c'est une bonne réponse
    if (!isInitialLoad) {
      newCount = questionCount + 1;
      setQuestionCount(newCount);
    }

    // --- LOGIQUE D'ACCÉLÉRATION PROGRESSIVE (CORRECTE) ---
    // Le multiplicateur est 0 pour les questions 1 et 2 (newCount - 2 = 0)
    // Le multiplicateur devient 1 à la question 3, 2 à la question 4, etc.
    const speedIncreaseMultiplier = Math.max(0, newCount - 2);
    const newSpeed = TRACK_SPEED + (speedIncreaseMultiplier * SPEED_INCREMENT_PER_QUESTION);
    setGameSpeed(newSpeed); // Mise à jour de la vitesse
    
    // TRÈS IMPORTANT : Vérifiez cette log dans la console !
    console.log(`[GameContainer] Q n°${newCount} | Mult. Accél: ${speedIncreaseMultiplier} | Vitesse calculée: ${newSpeed.toFixed(2)}`);


    // Charger la nouvelle question
    const q = await fetchQuestion();
    setQuestion(q);
  }, [questionCount]); 

  // ------------------------------------------
  // 3. EFFET INITIAL
  // ------------------------------------------
  
  // Charge la première question au montage et définit la vitesse initiale
  useEffect(() => {
    // Initialisation lors du montage
    if (!question) {
      setQuestionCount(0); 
      setGameSpeed(TRACK_SPEED);
      loadNewQuestion(true); 
    }
  }, []); 

  // ------------------------------------------
  // 4. GESTION DES RÉPONSES
  // ------------------------------------------

  const handleAnswerChosen = (index) => {
    if (isGameOver || !question) return;

    if (index === question.correctIndex) {
      // Bonne réponse : augmente le score et calcule la nouvelle vitesse
      setScore((prev) => prev + 1);
      // Appelle loadNewQuestion pour incrémenter le compteur et recalculer la vitesse
      loadNewQuestion(false); 
      
    } else {
      // Mauvaise réponse : Game Over
      setIsGameOver(true);
    }
  };

  // ------------------------------------------
  // 5. GESTION DU REDÉMARRAGE
  // ------------------------------------------

  const handleRestart = () => {
    setIsGameOver(false);
    setScore(0);
    setQuestionCount(0); // Réinitialisation du compteur de questions
    setGameSpeed(TRACK_SPEED); // Réinitialisation de la vitesse
    loadNewQuestion(true); // Rechargement initial (sans incrémenter le compteur)
  };

  // ------------------------------------------
  // 6. RENDU
  // ------------------------------------------

  return (
    <div style={{ position: "relative" }}>
      {isGameOver ? (
        <GameOverScreen score={score} onRestart={handleRestart} />
      ) : (
        <>
          <CanvasGame
            question={question}
            onAnswerChosen={handleAnswerChosen}
            isGameOver={isGameOver}
            gameSpeed={gameSpeed} // ⬅️ PASSAGE DE LA VITESSE AU CANVAS
          />
          <HUDContainer
            question={question}
            score={score}
            onAnswerChosen={handleAnswerChosen}
          />
        </>
      )}
    </div>
  );
}