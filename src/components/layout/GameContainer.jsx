import { useEffect, useState } from "react";
import CanvasGame from "../canvas/CanvasGame";
import HUDContainer from "../hud/HudContainer";
import { fetchQuestion } from "../../game/QuizEngine";
import GameOverScreen from "../canvas/GameOverScreen";
import { audioManager } from "../../game/AudioManager"; 

export default function GameContainer({ category, onBackToMenu }) {
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Gestion de la Musique de fond
  useEffect(() => {
    // Si le jeu tourne et qu'on n'a pas perdu, on lance la musique
    if (!isGameOver) {
      audioManager.playMusic();
    } else {
      audioManager.stopMusic();
    }

    // Nettoyage : Si on quitte le composant (retour menu), on coupe le son
    return () => {
      audioManager.stopMusic();
    };
  }, [isGameOver]);

  useEffect(() => {
    async function loadQuestion() {
      setQuestion(null); 
      const q = await fetchQuestion(category);
      setQuestion(q);
    }
    loadQuestion();
   
  }, []); 

  const handleAnswerChosen = (index) => {
    if (isGameOver || !question) return;

    if (index === question.correctIndex) {
     -
      audioManager.playCorrect();
      
      setScore((prev) => prev + 1);
      fetchQuestion(category).then((q) => setQuestion(q));
    } else {
     
      audioManager.playWrong();
      
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setScore(0);
    setQuestion(null);
    fetchQuestion(category).then((q) => setQuestion(q));
    // La musique redémarrera automatiquement grâce au useEffect qui surveille isGameOver
  };

  // Écran de chargement interne
  if (!question && !isGameOver) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        color: 'white',
        fontFamily: "'Press Start 2P', cursive",
        fontSize: '20px'
      }}>
        CHARGEMENT...
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {isGameOver ? (
        <GameOverScreen 
            score={score} 
            onRestart={handleRestart} 
            onHome={onBackToMenu} 
        />
      ) : (
        <>
          <CanvasGame
            score={score} 
            question={question}
            onAnswerChosen={handleAnswerChosen}
            isGameOver={isGameOver}
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
