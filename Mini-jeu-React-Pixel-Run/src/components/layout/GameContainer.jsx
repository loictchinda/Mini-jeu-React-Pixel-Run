import { useEffect, useState } from "react";
import CanvasGame from "../canvas/CanvasGame";
import HUDContainer from "../hud/HudContainer";
import { fetchQuestion } from "../../game/QuizEngine";
import GameOverScreen from "../canvas/GameOverScreen";
// 👇 IMPORT 1 : Le visuel du menu pause
import PauseScreen from "../canvas/PauseScreen";
// 👇 IMPORT 2 : La commande pour arrêter le moteur
import { setGamePaused } from "../canvas/gameLogic";

export default function GameContainer() {
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

    // 👇 NOUVEAU STATE : Est-ce qu'on est en pause ?
    const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function loadQuestion() {
      const q = await fetchQuestion();
      setQuestion(q);
    }

    loadQuestion();
  }, []);

  const handleAnswerChosen = (index) => {
    // 👇 SECURITÉ : On interdit de répondre si c'est en pause
    if (isGameOver || !question || isPaused) return;

    if (index === question.correctIndex) {
      setScore((prev) => prev + 1);
     
      fetchQuestion().then((q) => setQuestion(q));
    } else {
     
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setIsGameOver(false);
    setScore(0);
    setIsPaused(false);
    setGamePaused(false); // On redémarre le moteur
    fetchQuestion().then((q) => setQuestion(q));
  };

  // 👇 FONCTION 1 : Basculer la pause (Appelée par le bouton HUD et "Continuer")
  const togglePause = () => {
      const nouveauStatut = !isPaused;
      setIsPaused(nouveauStatut);     // 1. Affiche le menu React
      setGamePaused(nouveauStatut);   // 2. Arrête le mouvement JS
    };

  // 👇 FONCTION 2 : Quitter (Appelée par le bouton "Quitter")
  const handleQuit = () => {
      setGamePaused(false); // On débloque le moteur
      setIsPaused(false);   // On enlève le menu
      setIsGameOver(true);  // On déclenche la fin de partie
    };

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
          />
          <HUDContainer
            question={question}
            score={score}
            onAnswerChosen={handleAnswerChosen}
            onTogglePause={togglePause} // 👇 On passe la commande au HUD
            isPaused={isPaused}
          />

          {/* 👇 MAGIE : Si isPaused est Vrai, on affiche le menu par-dessus */}
          {isPaused && (
              <PauseScreen
                  onResume={togglePause}
                  onQuit={handleQuit}
                />
            )}
        </>
      )}
    </div>
  );
}
